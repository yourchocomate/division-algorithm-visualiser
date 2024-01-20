// Function to find the quotient and remainder using Restoring Division
function restoringDivision(Q, M, A) {

    console.time("Time taken (Restoring)");

    let count = M.length - 1;
    let steps = [];
    
    steps[1] = [{A, Q, M, step: "Begin", op: ["s"]}];

    while (count > 0) {
        const step = M.length - count + 1;
        let operations = [];
        A = A.substr(1) + Q[0];
        operations.push({A, Q: Q.substr(1) + "_", M, step: "Left Shift", op: ["q","a"]});
        let comp_M = complement(M);
        A = add(A, comp_M).sum;
        operations.push({A, Q: Q.substr(1) + "_", M, step: "A = A - M", op: ["a"]});

        if (A[0] === "1") {
            Q = Q.substr(1) + "0";
            A = add(A, M).sum;
            operations.push({A, Q, M, step: "Restoration", op: ["q","a"]});
        } else {
            Q = Q.substr(1) + "1";
            operations.push({A, Q, M, step: "No Restoration", op: ["q"]});
        }

        count--;

        steps[step] = operations;
    }

    console.timeEnd("Time taken (Restoring)");

    return {Q, A, steps};
}

function nonRestoringDivision(Q, M, A) {

    console.time("Time taken (Non-Restoring)");
    
    let count = M.length - 1;
    let comp_M = complement(M);
    let steps = [];

    steps[1] = [{A, Q, M, step: "Begin", op: ["s"]}];

    while (count) {
        const step = M.length - count + 1;
        let operations = [];

        const signbit = A[0];

        A = A.substr(1) + Q[0];
        operations.push({A, Q: Q.substr(1) + "_", M, step: "Left Shift", op: ["q","a"]});

        if (signbit === '1') {
            A = add(A,M).sum;
            operations.push({A, Q: Q.substr(1) + "_", M, step: "A = A + M", op: ["a"]});
        } else {
            A = add(A, comp_M).sum;
            operations.push({A, Q: Q.substr(1) + "_", M, step: "A = A - M", op: ["a"]});
        }

        let firstbit = A[0];
        
        Q = Q.substr(1) + (firstbit === '1' ? '0' : '1');

        const conflict = firstbit === '1' && count === 1;

        if(conflict) {
            A = add(A, M).sum;
        }

        operations.push({A, Q, M, step: "Q[0] = " + (firstbit === '1' ? '0' : '1') + (conflict ? ", A = A + M" : ""), op: conflict ? ["q", "a"] : ["q"]});

        count--;

        steps[step] = operations;
    }

    console.timeEnd("Time taken (Non-Restoring)");

    return {Q, A, steps};
}


function printSteps(steps, id, speed) {

    const speedms = speed * 1000;

    const tableBody = document.getElementById(id);
    steps.forEach((step, index) => {
        step.forEach((operation, istep) => {
            tableBody.innerHTML += `<tr>
                ${istep === 0 ? `<td rowspan="${step.length}">${index}</td>` : ""}
                <td class="cell-${id}-a-${index}-${istep}">${operation.A}</td>
                <td class="cell-${id}-q-${index}-${istep}">${operation.Q}</td>
                <td>${operation.M}</td>
                <td class="cell-${id}-s-${index}-${istep}">${operation.step}</td>
            </tr>`;

            setTimeout(() => {
                const opcell = document.querySelectorAll(`.cell-${id}-s-${index}-${istep}`);
                opcell.forEach(cell => {
                    cell.classList.add("op-cell");
                    setTimeout(() => {
                        cell.classList.remove("op-cell");
                    }, speedms);
                });
            }, speedms * (istep + index * step.length));


            operation.op.forEach((op, iop) => {
                setTimeout(() => {
                    const cells = document.querySelectorAll(`.cell-${id}-${op}-${index}-${istep}`);
                    cells.forEach(cell => {
                        cell.classList.add("active-cell");
                        setTimeout(() => {
                            cell.classList.remove("active-cell");
                        }, speedms * 0.7);
                    })
                }, speedms * (istep + (iop * 0.5) + index * step.length));
            })
        });
    });
}