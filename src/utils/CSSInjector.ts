class CSSInjector{

    injectCss(source){
        let alreadyAddedLink = Array.from(document.getElementsByTagName('link'))
            .find(el => el.getAttribute('href').includes(source));

        if(!alreadyAddedLink){
            let link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = source;
            document.getElementsByTagName('head')[0].appendChild(link);
        }
    }

}

export default new CSSInjector;