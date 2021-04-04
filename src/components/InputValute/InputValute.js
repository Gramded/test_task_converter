import React from 'react';
import './InputValue.css'

export default class InputValute extends React.Component{

    state = {
        date: '',
        valuteIsNow: undefined,
        list: []
    };

    setValute = (event) => {
        this.setState({valuteIsNow: event.target.value})
    }

    componentDidMount() {
        fetch("https://www.cbr-xml-daily.ru/daily_json.js", {  method: "GET"}).then(res =>
            res.json()
        ).then((result) => {
            if (this.state.valuteIsNow === undefined) {
                this.setState({list: Object.keys(result.Valute), valuteIsNow: Object.keys(result.Valute)[0]})
            } else {
                this.setState({list: Object.keys(result.Valute)})
            }
            });
    }


    render() {
        const items = this.state.list;
        return (
            <div className={this.props.class}>
                <p>{this.props.text}</p>
                <div>
                    {/*<List listItems={this.state.list} getFullList={this.state.list}/>*/}
                    <select id={this.props.id} onChange={this.props.inputName} onInput={this.setValute}>
                        {
                            items.map(el => (
                                <option key={el} value={el}>
                                    {el}
                                </option>
                            ))
                        }
                    </select>
                    <input type="number" name={this.props.inpName} onInput={this.props.inputData} value={this.props.summ}/>
                </div>
            </div>
        )
    }
}