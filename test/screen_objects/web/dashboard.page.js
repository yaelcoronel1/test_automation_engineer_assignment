class DashboardPage{
    get menuSlidingBtn(){
        return $('button.menuNav.show');
    }

    get sessionsLink(){
        return $('//*[@id="primary-navigation"]/ul/li[1]/a');
    }

    get identitiesLink(){
        return $('//*[@id="primary-navigation"]/ul/li[2]/a');
    }

    get flowsLink(){
        return $('//*[@id="primary-navigation"]/ul/li[5]/a');
    }

    get closeMenuBtn(){
        return $('button.close-nav');
    }
}

export default new DashboardPage();