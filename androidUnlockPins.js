/* find all valid android lock pin patterns

Given an Android 3x3 key lock screen and two integers m and n, where 1 ≤ m ≤ n ≤ 9, 
count the total number of unlock patterns of the Android lock screen, 
which consist of minimum of m keys and maximum n keys.

Rules for a valid pattern:

1. Each pattern must connect at least m keys and at most n keys.
2. All the keys must be distinct.
3. If the line connecting two consecutive keys in the pattern passes through any other keys, 
the other keys must have previously selected in the pattern. 
4. No jumps through non selected key is allowed.
5. The order of keys used matters.

    0 1 2
    3 4 5
    6 7 8

*/

function findAllLockPatterns(m, n) {
   
    var res = 0;
    var jumpMap = [[], [], [], [], [], [], [], [], []];

    jumpMap[0][2] = 1;
    jumpMap[0][6] = 3;
    jumpMap[0][8] = 4;
    jumpMap[1][7] = 4;
    jumpMap[2][0] = 1;
    jumpMap[2][8] = 5;
    jumpMap[2][6] = 4;
    jumpMap[3][5] = 4;
    jumpMap[5][3] = 4;
    jumpMap[6][8] = 7;
    jumpMap[6][2] = 4;
    jumpMap[6][0] = 3;
    jumpMap[7][1] = 4;
    jumpMap[8][0] = 4;
    jumpMap[8][2] = 5;
    jumpMap[8][6] = 7;

    var visited = {};

    // find pattern with min length m and max length n
    for(let i=m; i <= n; i++) {
        // find pattern for 0 to 8
        res += findPattern(visited, jumpMap, 0, i-1) * 4;
        res += findPattern(visited, jumpMap, 1, i-1) * 4;
        res += findPattern(visited, jumpMap, 4, i-1);
    }

    return res;
}

function findPattern(visited, jumpMap, start, remaining) {
    // 0 1 2
    // 3 4 5
    // 6 7 8

    if (remaining === 0) {
        // stop here since we found the complete length of the pattern and we are done
        return 1;   // res is returned as 1 only here when remaining becomes 0
    }

    if (remaining < 0) {
        return 0;
    }

    // mark visited for start as 1
    visited[start] = true;

    var res = 0;

    // find all pins starting with pin "start" 
    // search for the next pin "j"
    // total length of pin is "remaining"
    for (let j=0; j<9; j++) {
        // continue finding this pattern if pin j satisfies the following condition
        if (!visited[j] && (jumpMap[start][j] === 0 || visited[jumpMap[start][j]])) {
            // j now becomes like "start" for the next round
            // and we continue finding the remaining pins
            res += findPattern(visited, jumpMap, j, remaining-1);
        }
    }
    
    // reset visited
    visited[start] = false;

    return res;
}


console.log(findAllLockPatterns(1, 4));