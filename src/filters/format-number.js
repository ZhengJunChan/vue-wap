export default function (num) {
    let splitNum = 10000;

    if (num > splitNum) {
        num = (num / splitNum).toFixed(1);
        if (num.indexOf('.0') >= 0) {
            num = num.split('.0')[0];
        }

        num += '万';
    }

    return num || 0;
};
