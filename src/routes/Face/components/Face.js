import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, CardBody } from 'reactstrap';
import classnames from 'classnames';
import threeEntryPoint from './threeEntryPoint';
import ProgressBar from './ProgressBar';
import faceImg from '../../../assets/images/face.png';

class Face extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      faceId: this.props.match.params.faceId,
      texture: '',
      analyzeView: false,
    };

    this.toggleButton = this.toggleButton.bind(this);
    this.showAnalyzeView = this.showAnalyzeView.bind(this);
  }

  componentDidMount() {
    this.props.loadFace(this.state.faceId, () => {
      this.threeEntryPoint = new threeEntryPoint(this.threeRootElement, this.props.face);
    });
  }

  toggleButton(value) {
    let { texture } = this.state;
    if (texture === value) {
      texture = '';
    } else {
      texture = value;
    }

    this.setState({ texture }, () => {
      this.threeEntryPoint.updateTexture(texture);
    });
  }

  showAnalyzeView() {
    this.setState({ analyzeView: true });
  }

  render() {
    const { loading, face } = this.props;
    const { texture, analyzeView } = this.state;
    const textures = [
      { name: 'goodwood', icon: 'fa-circle' },
      { name: 'color', icon: 'fa-adjust' },
      { name: 'metal', icon: 'fa-circle-o' },
    ];

    const points = {
      1: 62,
      2: 84,
      3: 33,
      4: 91,
    };

    return (
      <div className="container-fluid">
        <div className="animated fadeIn mt-3">
          <Row className="mb-2">
            <Col>
              <Link to="/" className="btn btn-link">Back</Link>
            </Col>
          </Row>
          { !analyzeView
            ?
              <Row>
                <Col>
                  <div className="object-renderer" ref={element => this.threeRootElement = element}></div>
                  <div className="text-center my-2">
                    { textures.map(item =>
                        <Button color="secondary" className="mx-2" onClick={() => this.toggleButton(item.name)} outline={texture !== item.name} active={texture === item.name} key={item.name}>
                          <i className={classnames('fa', 'fa-2x', item.icon)}></i>
                        </Button>
                      )
                    }
                  </div>
                  <Button color="link" className="btn-next" onClick={() => this.showAnalyzeView()}>Next</Button>
                </Col>
              </Row>
            :
              <Card>
                <CardBody>
                  <Row>
                    <Col xs="12">
                      <h1 className="h1 text-uppercase text-center">How does your face fit?</h1>
                    </Col>
                    <Col md="6">
                      <img src={faceImg} alt="face" className="img-fluid" />
                      <p className="mt-2 text-center text-uppercase text">
                        Base detection reference: <br />
                        Lewis Hamilton
                      </p>
                    </Col>
                    <Col md="6" className="right-pane">
                      <div className="bg-grey p-4">
                        <p className="text-uppercase text">
                          Feature set <br />
                          Proportion match
                        </p>
                        <div className="points">
                          { Object.keys(points).map(key =>
                              <div className="d-flex mb-3" key={key}>
                                <div className="text text-uppercase">
                                  x
                                  <sub>{key}</sub>
                                </div>
                                <ProgressBar percent={points[key]} showLabel />
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
          }
        </div>
      </div>
    )
  }
}

export default Face;
