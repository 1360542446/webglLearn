window.addEventListener('load', e => {
    const canvas = document.getElementById('canvas');

    let gl = getWebGLContext(canvas, false);
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

    let positionData = new Float32Array([0.5, 1.0, 0.0, 1.0]);
    gl.vertexAttrib1fv(a_Position, positionData);
    gl.vertexAttrib1f(a_PointSize, 10.0);

    gl.drawArrays(gl.POINTS, 0, 4);

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
    void main(){
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
`;