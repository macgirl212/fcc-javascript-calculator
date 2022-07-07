class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.resetState = this.resetState.bind(this)
        this.state = {
            currentValue: 0,
            firstNumber: true,
            equation: ''
        }
    }

    //RESET TO ZERO
    resetState() {
        this.setState({
            currentValue: 0,
            firstNumber: false,
        })
    }

    //BUTTON LISTENERS
    handleClick(e) {
        if (e.target.value === 'allclear') {
            this.setState({
                currentValue: 0,
                firstNumber: true,
            })
        }

        //DIGITS AND DECIMAL POINTS
        if (/\d|\./.test(e.target.value)) {
            if (this.state.firstNumber === true) {
                //INITIAL NUMBER
                this.resetState()
                this.setState({
                    currentValue: e.target.value,
                })
            } else if (e.target.value === '0' && this.state.currentValue == 0) {
                //NO DOUBLE ZERO
                this.setState({
                    currentValue: 0,
                    firstNumber: true
                })
            } else if (/\./.test(e.target.value) && /\./.test(this.state.currentValue)) {
                //NO DOUBLE DECIMALS
                this.setState(prevState => ({
                    currentValue: prevState.currentValue
                }))
            } else if (this.state.currentValue != 0) {
                //CONCATENATE ADDITIONAL NUMBERS
                this.setState(prevState => ({
                    currentValue: prevState.currentValue.concat(e.target.value)
                }))
            }
        //NEGATIVE NUMBERS
        } else if (this.state.firstNumber === true && /-/.test(e.target.value)) {
            this.setState({
                currentValue: '-',
                firstNumber: false,
            })
        } else if (/[+\-\/*]/.test(e.target.value)) {
        //OPERATORS
            this.setState(prevState => ({
                equation: prevState.equation.concat(this.state.currentValue).concat(e.target.value)
            }))
            this.resetState()
            this.setState({
                firstNumber: true
            })
        //EQUAL SIGN
        } else if (/(equals)/.test(e.target.value)) {
            //DOUBLE OPERATOR DESTROYER
            let doubleOperatorsRegex = /[+\-\/*]{2,}/g
            let matchedDoubleOperators = doubleOperatorsRegex.exec(this.state.equation)
            if (matchedDoubleOperators) {
                let lastOperator = matchedDoubleOperators[0].slice(-1)
                this.setState(prevState => ({
                    equation: prevState.equation.replace(`${matchedDoubleOperators[0]}`, `${lastOperator}`)
                }))
            }
            //REGULAR EVALUATION
            this.setState(prevState => ({
                equation: prevState.equation
                    .concat(this.state.currentValue)
                    .concat(e.target.value)
                    .replace('equals', '')
            }), () => {
                let evaluate = (math.evaluate(this.state.equation))
                this.setState({
                    currentValue: evaluate,
                    firstNumber: true,
                    equation: ''
                })
            })
        }
    }

    render() {
        const display = this.state.currentValue

        return (
            <div className="calculator">
                <div id="display">{display}</div>
                <Buttons onClick={this.handleClick}/>
            </div>
        )
    }
}

const Buttons = ({ onClick }) => {
    return (
        <div className="container">
            <div className="row row-cols-5 g-2">
                <div className="col-3 text-center">
                    <button value="allclear" onClick={onClick} className="btn special-btn all-clear" id="clear">AC</button>
                </div>
                <div className="col-6"></div>
                <div className="col-3 text-center">
                    <button value="equals" onClick={onClick} className="btn special-btn equals-operator" id="equals">=</button>
                </div>
                <div className="col-3 text-center">
                    <button value="7" onClick={onClick} className="btn number" id="seven">7</button>
                </div>
                <div className="col-3 text-center">
                    <button value="8" onClick={onClick} className="btn number" id="eight">8</button>
                </div>
                <div className="col-3 text-center">
                    <button value="9" onClick={onClick} className="btn number" id="nine">9</button>
                </div>
                <div className="col-3 text-center">
                    <button value="/" onClick={onClick} className="btn operator" id="divide">÷</button>
                </div>
                <div className="col-3 text-center">
                    <button value="4" onClick={onClick} className="btn number" id="four">4</button>
                </div>
                <div className="col-3 text-center">
                    <button value="5" onClick={onClick} className="btn number" id="five">5</button>
                </div>
                <div className="col-3 text-center">
                    <button value="6" onClick={onClick} className="btn number" id="six">6</button>
                </div>
                <div className="col-3 text-center">
                    <button value="*" onClick={onClick} className="btn operator" id="multiply">X</button>
                </div>
                <div className="col-3 text-center">
                    <button value="1" onClick={onClick} className="btn number" id="one">1</button>
                </div>
                <div className="col-3 text-center">
                    <button value="2" onClick={onClick} className="btn number" id="two">2</button>
                </div>
                <div className="col-3 text-center">
                    <button value="3" onClick={onClick} className="btn number" id="three">3</button>
                </div>
                <div className="col-3 text-center">
                    <button value="-" onClick={onClick} className="btn operator" id="subtract">-</button>
                </div>
                <div className="col-6 text-center">
                    <button value="0" onClick={onClick} className="btn big-number" id="zero">0</button>
                </div>
                <div className="col-3 text-center">
                    <button value="." onClick={onClick} className="btn number" id="decimal">.</button>
                </div>
                <div className="col-3 text-center">
                    <button value="+" onClick={onClick} className="btn operator" id="add">+</button>
                </div> 
            </div>
        </div>
    )
}

const App = () => {
    return (
        <Calculator />
    )
}

ReactDOM.render(<App />, document.getElementById('root'))