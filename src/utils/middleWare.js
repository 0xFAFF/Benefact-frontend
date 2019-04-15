
function middleWare(arg, handler, next) {
    if(!next) next = () => { };
    return () => handler(arg, next);
}

export default middleWare;