/**
 * Created by ty on 2016/10/13 0013.AMD规范
 */
define(['./module1.js'], function (sum) {
    return console.log('AMD规范：1 + 2 =',sum(1, 2),'计算的结果调用的commonjs规范');
});