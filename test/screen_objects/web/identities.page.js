class IdentitiesPage{
    get fullName(){
        return $('button.identity-cell-link');
    }

    get filterBtn(){
        return $('#filter-menu-trigger');
    }

    get idNumberBtn(){
        return $('//*[@id="root"]/div/div/div/div[3]/div/div/ul/li[7]/button');
    }

    get idNumberInput(){
        return $('#personalIdNumber');
    }

    get applyFilterBtn(){
        return $('button.filter-search');
    }

    get notFoundText(){
        return $('.no-result-title');
    }

    async refreshPage() {
        await browser.refresh();
    }

    
}

export default new IdentitiesPage();