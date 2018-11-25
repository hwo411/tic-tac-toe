import React, { Component } from 'react';
import { HexGrid, Layout, Hexagon, Text, HexUtils, Hex } from 'react-hexgrid'
import './App.css';

const WIN_SIZE = 4;
const MIN_TURNS_TO_CHECK = 7;
const X = 1;
const O = 0;
const DRAW = -1;
const X_TEXT = 'X';
const O_TEXT = 'O';

class App extends Component {
  constructor(props) {
    super(props);
    this.level2hexs = [
      new Hex(0, -2, 2),
      new Hex(1, -2, 1),
      new Hex(2, -2, 0),
      new Hex(2, -1, -1),
      new Hex(2, 0, -2),
      new Hex(1, 1, -2),
      new Hex(0, 2, -2),
      new Hex(-1, 2, -1),
      new Hex(-2, 2, 0),
      new Hex(-2, 1, 1),
      new Hex(-2, 0, 2),
      new Hex(-1, -1, 2)
    ]

    this.level1hexs = [
      new Hex(0, -1, 1),
      new Hex(1, -1, 0),
      new Hex(1, 0, -1),
      new Hex(0, 1, -1),
      new Hex(-1, 1, 0),
      new Hex(-1, 0, 1)
    ]

    this.level0hexs = [
      new Hex(0, 0, 0)
    ]

    this.hexagons = [...this.level0hexs, ...this.level1hexs, ...this.level2hexs]

    this.state = {
      turns: {},
      turnsMade: 0,
      turn: X,
      result: null,
      winCombination: []
    }
  }

  makeTurn(hex) {
    const { turns, turn, turnsMade } = this.state
    const newTurn = {};
    newTurn[HexUtils.getID(hex)] = turn
    const newTurns = Object.assign(newTurn, turns)
    const newTurnsMade = turnsMade + 1
    const [result, winCombination] = this.checkResult(newTurns, newTurnsMade)

    this.setState({ result: result, winCombination: winCombination, turn: result === null ? (turn + 1) % 2 : undefined, turns: newTurns, turnsMade: newTurnsMade })
  }

  checkResult(turns, turnsMade) {
    if (turnsMade < MIN_TURNS_TO_CHECK) {
      return [null, []];
    }

    let result;
    let winCombination;

    [result, winCombination] = this.checkRound(turns, this.level1hexs);

    if (result !== null) {
      return [result, winCombination];
    }

    [result, winCombination] = this.checkRound(turns, this.level2hexs);

    if (result !== null) {
      return [result, winCombination];
    }

    [result, winCombination] = this.checkDiagonals(turns);

    if (result !== null) {
      return [result, winCombination];
    }

    return [turnsMade >= this.hexagons.length ? DRAW : null, []];
  }

  checkRound(turns, hexs) {
    let currentTurn = this.getTurn(turns, hexs[0]);
    let winCombination = currentTurn === undefined ? [] : [hexs[0]];

    for (let i = 1; i < hexs.length + WIN_SIZE - 1; ++i) {
      const hex = hexs[i % hexs.length];
      const nextTurn = this.getTurn(turns, hex);

      if (currentTurn === nextTurn) {
        if (currentTurn !== undefined) {
          winCombination.push(hex);

          if (winCombination.length >= WIN_SIZE) {
            return [currentTurn, winCombination];
          }
        }
      } else {
        currentTurn = nextTurn;
        winCombination = currentTurn === undefined ? [] : [hex];
      }
    }

    return [null, []];
  }

  checkDiagonals(turns) {
    for (let i = 0; i < this.level2hexs.length; ++i) {
      const hex = this.level2hexs[i];
      const turn = this.getTurn(turns, hex);

      if (turn === undefined) {
        continue;
      }

      const winCombination = [hex];

      let nextHex = this.level1hexs[Math.trunc(i / 2)];

      if (this.getTurn(turns, nextHex) !== turn) {
        continue;
      }

      winCombination.push(nextHex);

      const direction = HexUtils.subtract(nextHex, hex);

      for (let j = 0; j < WIN_SIZE - 2; ++j) {
        nextHex = HexUtils.add(nextHex, direction);

        if (this.getTurn(turns, nextHex) !== turn) {
          break;
        }

        winCombination.push(nextHex);
      }

      if (winCombination.length >= WIN_SIZE) {
        return [turn, winCombination];
      }
    }

    return [null, []];
  }

  hexLevel(hex) {
    return Math.max(Math.max(Math.abs(hex.q), Math.abs(hex.r)), Math.abs(hex.s));
  }

  getTurn(turns, hex) {
    return turns[HexUtils.getID(hex)];
  }

  hexText(turns, hex) {
    const hexTurn = this.getTurn(turns, hex);

    return hexTurn === X ? X_TEXT : (hexTurn === O ? O_TEXT : null);
  }

  render() {
    const { hexagons } = this
    const { turns, result, winCombination, turn } = this.state;
    return (
      <div className="App">
        <h1>
          {
              result !== null ?
              (result === O ? 'O wins' : (result === X ? 'X wins' : 'Draw')) :
              (turn === O ? "O's turn" : "X's turn")
          }
        </h1>
        <HexGrid width="100%" height={null} viewBox="-50 -50 100 100">
          <Layout size={{ x: 10, y: 10 }} flat={true} spacing={1.01} origin={{ x: 0, y: 0 }}>
            {
              hexagons.map(
                (hex, i) => {
                  const hexTurn = this.getTurn(turns, hex);

                  return (
                    <Hexagon
                      key={i}
                      q={hex.q}
                      r={hex.r}
                      s={hex.s}
                      className={ [`level${this.hexLevel(hex)}`, winCombination.find((whex) => HexUtils.equals(whex, hex)) ? 'winner' : ''].join(' ')  }
                      onClick={(hexTurn === undefined && result === null) ? () => this.makeTurn(hex) : undefined }
                    >
                      <Text>{this.hexText(turns, hex)}</Text>
                    </Hexagon>
                  )
                }
              )
            }
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

export default App;
