'use strict';

class Triangles {
    constructor(options) {
        let self = this;

        if (!options || !options.element) {
            return;
        }

        this.canvas = options.element
        if (!this.canvas.getContext) { 
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.trigList = Array.apply(null, Array(25)).map(Number.prototype.valueOf, 0);
        this.lastX = null;
        this.lastY = null;

        this.resize();

        this.trigList = this.trigList.map(function (item) {
            return {
                x: Math.random() * self.canvas.width,
                y: Math.random() * self.canvas.height * 1.8,
                a: Math.random() / 8 + 0.5,
                s: Math.random() * 0.5 + 0.4,
                r: Math.random() / 2 + 0.5,
                c: `rgba(0, 0, 0, ${0.5 * Math.random() + 0.2})`
            };
        });

        window.addEventListener('resize', () => {
            this.resize();
            this.render(true);
        })

        this.interval = setInterval(() => { this.render() }, 12);
    }

    drawTriangle(x, y, raito, fillStyle) {
        let width = 80;
        let height = 96;
        
        // Set up the fill style.
        this.ctx.fillStyle = fillStyle;

        // Draw this triangle.
        this.ctx.beginPath();
        this.ctx.moveTo(x + 0.5 * width * raito, y);
        this.ctx.lineTo(x, y + height * raito);
        this.ctx.lineTo(x + width * raito, y + height * raito);
        this.ctx.lineTo(x + 0.5 * width * raito, y);
        this.ctx.fill();
    }

    render(noUpdate) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let item of this.trigList) {
            this.drawTriangle(item.x, item.y, item.r, item.c);
            if (noUpdate) {
                continue;
            }
            item.y -= item.s;
            if (item.y < -150) {
                item.y = this.canvas.height;
                item.x = Math.random() * window.innerWidth;
            }
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = "60";
    }
}

module.exports = Triangles;