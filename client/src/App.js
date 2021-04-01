import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import SinglePost from "./components/pages/SinglePost";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Container>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/post/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
