import { connect } from 'react-redux'
import Estimate from 'web/static/js/components/Estimate'
import * as EstimateActions from 'web/static/js/actions/EstimateActions'

const mapStateToProps = ({users}) => {
  const user = users.find(u => u.logged_in_user)
  return {
    name: user.name,
    optimistic: user.optimistic,
    realistic: user.realistic,
    pessimistic: user.pessismistic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateOptimistic: (estimate) => dispatch(EstimateActions.updateOptimistic(estimate)),
    updateRealistic: (estimate) => dispatch(EstimateActions.updateRealistic(estimate)),
    updatePessimistic: (estimate) => dispatch(EstimateActions.updatePessimistic(estimate))
  }
}

const Estimates = connect(mapStateToProps, mapDispatchToProps)(Estimate)
export default Estimates
