#include <stdio.h>
#include <math.h>
#include <stdbool.h>
#include <string.h>
#include <emscripten/emscripten.h>

#define SIZE 16

typedef char Board[SIZE][SIZE];

EMSCRIPTEN_KEEPALIVE bool isValid(Board board, int r, int c, char num) {
    int divider = sqrt(SIZE);

    for (int i = 0; i < SIZE; i++) {
        if (board[r][i] == num) {
            return false;
        }
    }

    for (int i = 0; i < SIZE; i++) {
        if (board[i][c] == num) {
            return false;
        }
    }

    int startRow = floor(r / divider) * divider;
    int startCol = floor(c / divider) * divider;

    for (int i = 0; i < divider; i++) {
        for (int j = 0; j < divider; j++) {
            if (board[startRow + i][startCol + j] == num) {
                return false;
            }
        }
    }

    return true;
}

EMSCRIPTEN_KEEPALIVE void emptyPos(Board board, int* r, int* c) {
    for (*r = 0; *r < SIZE; (*r)++) {
        for (*c = 0; *c < SIZE; (*c)++) {
            if (board[*r][*c] == '0') return;
        }
    }

    *r = -1;
    *c = -1;
}

EMSCRIPTEN_KEEPALIVE bool solve(Board board) {
    int r, c;
    emptyPos(board, &r, &c);

    if (r == -1) {
        return true;
    }

    for (char num = '1'; num <= '9'; num++) {
        if (isValid(board, r, c, num)) {
            board[r][c] = num;
            if (solve(board)) return true;
            board[r][c] = '0';
        }
    }

    for (char num = 'A'; num <= 'G'; num++) {
        if (isValid(board, r, c, num)) {
            board[r][c] = num;
            if (solve(board)) return true;
            board[r][c] = '0';
        }
    }
    return false;
}

EMSCRIPTEN_KEEPALIVE char* sudoku_solve(char* input){
    int len = sqrt(strlen(input));
    
    Board initialBoard;
    for (int i = 0; i < len; i++) {
        for (int j = 0; j < len; j++) {
            initialBoard[i][j] = '0';
        }
    }
    
    for (int i = 0; i < strlen(input); i++) {
        initialBoard[i / SIZE][i % SIZE] = input[i];
    }

    solve(initialBoard);

    char* result = (char*)malloc((SIZE * SIZE * 3 + 1) * sizeof(char));
    result[0] = '\0';

    for (int i = 0; i < SIZE; i++) {
        for (int j = 0; j < SIZE; j++) {
            result[i*SIZE+j] = initialBoard[i][j];
        }
    }    

    return result; 
}

int main() {
    return 0;
}