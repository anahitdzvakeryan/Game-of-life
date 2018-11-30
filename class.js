class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(num) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }


    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Grass(newX, newY, 1);
            this.multiply = 0;

        }
    }

}



class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.acted = false;

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(num) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }
    move() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(0));

            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                this.acted = true;



            }

            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }

    }

    mul() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new GrassEater(newX, newY, 2);

        }
    }
    eat() {
        if (this.acted == false) {

            var newCell = random(this.chooseCell(1));

            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;

                this.energy++;
                this.acted = true;


                if (this.energy >= 12) {
                    this.mul();
                    this.energy = 6;
                }

            }
            else {
                this.move();
            }
        }

    }
    die() {
        matrix[this.y][this.x] = 0;

    }
}

class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.index = index;
        this.acted = false;

    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y - 1]
        ];
    }

    chooseCell(num) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }

    move() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(0));

            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                this.acted = true;
            }
            this.energy--;
        }

        if (this.energy <= 0) {
            this.die();
        }

        // console.log(this.energy)
    }

    mul() {
        var newCell = random(this.chooseCell(0));

        if (newCell && this.energy >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Predator(newX, newY, 3);
            this.energy = 0;

        }
    }

    eat() {
        var newCell = random(this.chooseCell(2));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            this.energy++;


            if (this.energy >= 12) {
                this.mul();
                this.energy = 3;
            }

        }
        else {
            this.move();
        }

    }
    die() {
        matrix[this.y][this.x] = 0;

    }

}

class Fly {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.acted = false;
        this.multiply = 0;
        this.energy = 50;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y - 1]
        ];

    }
    chooseCell(num) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }


    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));

        if (newCell && this.multiply >= 12) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Fly(newX, newY, 4);
            this.multiply = 0;
            this.energy = 0;
        }
    }


    move() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(random([0, 7])));

            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
            }
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
            this.acted = true;

        }

    }
    die() {
        matrix[this.y][this.x] = 0;

    }
}





class Spider {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.directions = [
            // [this.x, this.y - 2],
            // [this.x + 1, this.y - 1],
            // [this.x + 2, this.y],
            // [this.x + 1, this.y + 1],
            // [this.x, this.y + 2],
            // [this.x - 1, this.y + 1],
            // [this.x - 2, this.y],
            // [this.x - 1, this.y - 1],


            [this.x, this.y - 5],
            [this.x - 1, this.y - 4],
            // [this.x, this.y - 4],
            [this.x + 1, this.y - 4],
            [this.x - 2, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 2, this.y - 3],
            [this.x - 3, this.y - 2],
            [this.x - 1, this.y - 2],
            // [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 3, this.y - 2],
            [this.x - 4, this.y - 1],
            [this.x - 2, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x + 4, this.y - 1],
            [this.x - 5, this.y],
            // [this.x - 4, this.y],
            [this.x - 3, this.y],
            // [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            // [this.x + 2, this.y],
            [this.x + 3, this.y],
            // [this.x + 4, this.y],
            [this.x + 5, this.y],
            [this.x - 4, this.y + 1],
            [this.x - 2, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x + 4, this.y + 1],
            [this.x - 3, this.y + 2],
            [this.x - 1, this.y + 2],
            // [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 3, this.y + 2],
            [this.x - 2, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 2, this.y + 3],
            [this.x - 1, this.y + 4],
            // [this.x, this.y + 4],
            [this.x + 1, this.y + 4],
            [this.x, this.y + 5],
        ];
    }

    // getNewCoordinates() {

    // }

    chooseCell(num) {
        // this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }
    nerkel(){
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                matrix[y][x] = 7;

            }

        }
    }
    eat() {
        

        var newCell = random(this.chooseCell(4));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = 0;

            console.log("eat");

        }
    }
}





