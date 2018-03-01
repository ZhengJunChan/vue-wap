import { BrowserUtil } from '@/utils';

export default function (funName, params) {
    let appParams = {
        funcName: funName,
        params: params || ''
    };

    if (BrowserUtil.isFromIosApp()) {
        // 页面位于ios
        window.callAppFunction(appParams);
    } else if (BrowserUtil.isFromAndroidApp()) {
        // 页面位于android
        window.android.funtionAndroid(JSON.stringify(appParams));
    } else {
        console.error('无法识别app类型');
    }
};
