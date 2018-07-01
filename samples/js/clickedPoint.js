window.addEventListener('load', e => {
    const canvas = document.getElementById('canvas');

    let gl = getWebGLContext(canvas, false);
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    canvas.addEventListener('click', e => {
        let x = (e.x - canvas.offsetLeft - canvas.width * 0.5) / (canvas.width * 0.5);
        let y = (canvas.height * 0.5 - e.y + canvas.offsetTop) / (canvas.height * 0.5);
        drawPoints(gl, [x, y, 1.0, 1.0], 10.0);
    });
});

// 定点着色器
const VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute float a_PointSize;
void main(){
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
}`;

const FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_FragColor;
void main(){
    gl_FragColor = u_FragColor;
}
`;

/**
 *
 * @param {Object} gl
 * @param {Array} positions length=4
 * @param {number:float} pointSize
 */
const points = [];
const drawPoints = (gl, positions = [0.0, 0.0, 0.0, 1.0], pointSize) => {
    gl.clear(gl.COLOR_BUFFER_BIT);

    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    points.push(positions);
    points.forEach(position => {
        let newPositions = new Float32Array(position);
        gl.vertexAttrib4fv(a_Position, newPositions);
        gl.vertexAttrib1f(a_PointSize, pointSize);
        gl.uniform4f(u_FragColor, Math.abs(position[0]), Math.abs(position[1]), 0, 0.5);
        gl.drawArrays(gl.POINTS, 0, 1);
    });
};