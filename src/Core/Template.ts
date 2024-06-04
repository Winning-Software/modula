const html = (strings: TemplateStringsArray, ...values: any[]): HTMLElement => {
    const template: HTMLTemplateElement = document.createElement('template');
    let output: string = '';

    for (let i: number = 0; i < strings.length; i++) {
        output += strings[i] + (values[i] === undefined ? '' : values[i] as string);
    }

    template.innerHTML = output;

    return template.content.cloneNode(true) as HTMLElement;
}

export default html;