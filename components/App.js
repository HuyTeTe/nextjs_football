import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getUserAuth } from '../actions';

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);