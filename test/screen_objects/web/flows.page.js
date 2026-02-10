class FlowsPage{
    get newFlowBtn(){
        return $('button.button.title-button.white.md.icon');
    }

    get activeStatusText(){
        return $('div.status-badge.md.status-green');
    }

    get newFlowName(){
        return $('//*[@id="root"]/div/div/div/div/table/tbody/tr/td[1]');
    }
}

export default new FlowsPage();