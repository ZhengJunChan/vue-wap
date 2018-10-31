export default function (img, paramsStr) {
    if (typeof img !== 'string' || !img) {
        return '';
    }

    if (!paramsStr) {
        return img;
    }

    return img.indexOf('?') > 0 ? `${img}&${paramsStr}` : `${img}?${paramsStr}`;
};
