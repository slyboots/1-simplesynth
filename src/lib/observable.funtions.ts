export function Observable(value: any): any {
    var listeners: any[] = [];

    function notify(newValue: any) {
        listeners.forEach(function (listener) { listener(newValue); });
    }

    function accessor(newValue: any) {
        if (arguments.length && newValue !== value) {
            value = newValue;
            notify(newValue);
        }
        return value;
    }

    (accessor as any).subscribe = function (listener: any) { listeners.push(listener); };

    return accessor;
}
export function bindValue(input: any, observable: Function) {
    input.value = observable();
    (observable as any).subscribe(() => { input.value = observable(); })
}