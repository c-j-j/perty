import React from 'react'

class EstimationBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {input: ''}
  }

  render() {
    return (
      <input
        type="number"
        value={this.state.input}
        placeholder={this.props.placeholder}
        onChange={this.updateInput.bind(this)}
        onBlur={this.onBlur.bind(this)} />
    )
  }

  onBlur() {
    this.props.onBlur(this.state.input)
  }

  updateInput(e){
    this.setState({input: e.target.value})
  }
}

export default function Estimate({
  name,
  optimistic,
  realistic,
  pessimistic,
  updateOptimistic,
  updateRealistic,
  updatePessimistic,
}) {

  return (
    <div>
      <label>{name}</label>
      <EstimationBox placeholder="Optimistic" estimate={optimistic} onBlur={updateOptimistic} />
      <EstimationBox placeholder="Realistic" estimate={realistic} onBlur={updateRealistic} />
      <EstimationBox placeholder="Pessimistic" estimate={pessimistic} onBlur={updatePessimistic} />
    </div>
  )
}
