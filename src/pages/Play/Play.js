import React, { PureComponent, Component } from 'react';

class IndexPage extends Component {
    constructor() {
        super();
        this.state = {
            arr: ['1']
        };
        // console.log('constructor');
    }

    changeState = () => {
        const { arr } = this.state;
        arr.push('2');
        // console.log(arr);/
        // ["1", "2"]
        // ["1", "2", "2"]
        // ["1", "2", "2", "2"] 
        // ....
        this.setState({
            arr
        })
    };

    render() {
        // console.log('render');
        return (
          <div>
            <button onClick={this.changeState}>点击</button>
            <div>
              {this.state.arr.map((item) => {
                        return item;
                    })}
            </div>
          </div>
        );
    }
}


export default IndexPage