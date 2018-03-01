/**
 * Created by Administrator on 2018/1/25.
 */
import imgs from './img.js';
import { AjaxPlugin } from 'vux';
let createPicture = function (option, status) {
    if (Object.prototype.toString.call(option) !== '[object Object]') { return; }
    option = Object.assign({
        name: '源音塘用户',
        vip: true,
        head: imgs.head,
        title: '祝你',
        text: ''
    }, option);
    let pic = createCanvas();
    let pen = pic.getContext('2d');
    let I1 = createImg(pen, imgs.bg, 0, 0, 1080, 1920);
    let I2 = createImg(pen, option.head, 473, 115, 135, 135);
    let I3 = forVResult(pen, imgs, option);
    return Promise.all([I1.result, I2.result, I3]).then(
        () => {
            createFont(pen, option.name, {
                x: 540,
                y: 280,
                color: '#1a1717'
            });
            createFont(pen, option.text, {
                textAlign: 'start',
                size: '45px'
            });
            createFont(pen, option.title);
            return setDownEvents(pic, option, status);
        }
    );
};

let forVResult = function (pen, imgs, option) {
    let a = new Promise(function (resolve, reject) {
        resolve(1);
    });
    if (option.vip) {
        a = createImg(pen, imgs.v, 579, 210, 45, 45).result;
    }
    return a;
};
let createFont = function (p, text, option = {}) {
    if (typeof text === 'string') {
        createSingleFont(p, text, option);
    } else if (Object.prototype.toString.call(text) === '[object Array]') {
        createMoreFont(p, text, option);
    }
};
let createImg = function (p, src, x, y, x1, y1, fn) {
    let a = new Image();
    a.crossOrigin = 'anonymous';
    a.src = src;
    let promiseImg = new Promise(function (resolve, reject) {
        a.onload = () => {
            x = x || 0;
            y = y || 0;
            x1 = x1 || a.width;
            y1 = y1 || a.height;
            resolve({
                code: 200
            });
            p && p.drawImage && p.drawImage(a, x, y, x1, y1);
            typeof fn === 'function' && fn();
        };
        a.onerror = (e) => {
            console.log(777);
            console.log(e);
            resolve({
                code: 200
            });
        };
    });
    return {
        image: a,
        result: promiseImg
    };
};
let createCanvas = function (w = 1080, h = 1920) {
    let pic = document.createElement('canvas');
    pic.width = w;
    pic.height = h;
    return pic;
};
let createSingleFont = function (p, text, option = {}) {
    option = option || {};
    option = Object.assign({
        weight: 'normal',
        size: '52px',
        color: '#996600',
        family: 'PingFangSC-Medium',
        textAlign: 'center',
        baseline: 'top',
        x: 531,
        y: 916,
        w: undefined
    }, option);
    if (p) {
        p.textAlign = option.textAlign;
        p.textBaseline = option.baseline;
        p.font = `${option.weight} ${option.size} ${option.family}`;
        p.fillStyle = option.color;
        p.fillText(text, option.x, option.y, option.w);
    }
};
let createMoreFont = function (p, text, option = {}) {
    option = option || {};
    text.map((o) => {
        option = Object.assign(option, {
            x: o.x,
            y: o.y
        });
        createSingleFont(p, o.text, option);
    });
};
let setDownEvents = function (pic, option, status) {
    return new Promise((resolve, reject) => {
        try {
            if (status === true) {
                let url = pic.toDataURL('image/jpeg', 0.95);
                resolve({
                    code: 200,
                    data: {
                        url: url
                    }
                });
            } else {
                let saveA = document.createElement('a');
                saveA.download = `来自${option.name}的祝福.jpg`;
                pic.toBlob((file) => {
                    let url = URL.createObjectURL(file);
                    upPicture(file).then((res) => {
                        url = res._link;
                        resolve({
                            code: 200,
                            data: {
                                file: file,
                                fire() {
                                    saveA.href = url;
                                    saveA.click();
                                },
                                url: res._link
                            }
                        });
                    }).catch(() => {
                        reject({
                            code: 200,
                            msg: '生成图片失败!',
                            data: ''
                        });
                    });
                }, 'image/jpeg', 0.95);
            }
        } catch (e) {
            reject({
                code: 200,
                msg: '生成图片失败!',
                data: ''
            });
        }
    });
};
let upPicture = function (blob) {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    let data = new FormData();
    data.append('image', blob, 'filename.jpg');
    return AjaxPlugin.$http.post('/files/image/upload', data, config);
};
export { createPicture };
