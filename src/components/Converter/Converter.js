import React from 'react'
import InfoBlock from "../InfoBlock/InfoBlock";
import InputValute from "../InputValute/InputValute";


export default class Converter extends React.Component{

    state= {
        firstName: undefined,
        firstVall: 0,
        secondName: undefined,
        secondVall: 0,
        main: 'first',
        vallList: undefined,
        bank: 0
    }

    componentDidMount() {
        fetch("https://www.cbr-xml-daily.ru/daily_json.js", {  method: "GET"}).then(res =>
            res.json()
        ).then((result) => {
            if (this.state.firstName === undefined) {
                this.setState({firstName: Object.keys(result.Valute)[0]})
            }
            if (this.state.secondName === undefined) {
                this.setState({secondName: Object.keys(result.Valute)[0]})
            }
            this.setState({vallList: result})
        });
    }

    getDataName = (event) => {
        let val = {};
        val[`${event.target.id}Name`] = event.target.value;
        this.setState(val, this.timeToConvert);
    }

    getDataSumm = (event) => {
        let val = {};
        val[`${event.target.getAttribute('name')}Vall`] = event.target.value;
        val.main = event.target.getAttribute('name');
        this.setState(val, this.timeToConvert);

    }

    timeToConvert = () => {
        let name = `${this.state.main}Name`;
        let val = `${this.state.main}Vall`;
        this.setState({bank: this.state.vallList.Valute[this.state[name]].Value*this.state[val]/this.state.vallList.Valute[this.state[name]].Nominal}, () => {
            if (this.state.main === 'first') {
                this.setState({
                    secondVall: this.state.bank*this.state.vallList.Valute[this.state.secondName].Nominal/this.state.vallList.Valute[this.state.secondName].Value
                })
            } else if (this.state.main === 'second') {
                this.setState({
                    firstVall: this.state.bank*this.state.vallList.Valute[this.state.firstName].Nominal/this.state.vallList.Valute[this.state.firstName].Value
                })}
        });
    }


    render() {
        return (
            <>
                <InfoBlock classIs={'center'} text={'Currency Converter'}/>
                <div className={'input-value-block'}>
                    <InputValute
                        id={'first'}
                        inpName={'first'}
                        inputName={this.getDataName}
                        inputData={this.getDataSumm}
                        summ={this.state.firstVall}
                        class={'input-for-money-l'}
                        text={'One'} />
                    <InputValute
                        id={'second'}
                        inpName={'second'}
                        inputName={this.getDataName}
                        inputData={this.getDataSumm}
                        summ={this.state.secondVall}
                        class={'input-for-money-r'}
                        text={'Two'} />
                </div>
            </>
        )
    }
};