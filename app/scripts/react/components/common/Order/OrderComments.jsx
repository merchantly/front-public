import React, { Component, PropTypes } from 'react';
import FaIcon from 'rc/common/FaIcon';
import * as schemas from 'r/schemas';

class OrderComments extends Component {
  render() {
    const {
      comments,
    } = this.props;

    return comments.length
    ? (
      <div className="comments">
        <table style={{ width: '100%' }} className="comments__table">
          <tbody>
            {comments.map(({ body, author, createdAt }, idx) => (
              <tr className="comment__line" key={`order-comment-${idx}`}>
                <td>
                  <div className="comment__message">
                    <FaIcon name="clock-o" className="comment__message__time" />
                    {createdAt}
                  </div>
                </td>
                <td style={{ textAlign: 'left' }}>
                  <span>
                    {body}
                    {author && (
                      <span>
                        {'\u2014'}
                        <strong>
                          {author}
                        </strong>
                      </span>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
    : null;
  }
}

OrderComments.propTypes = {
  comments: PropTypes.arrayOf(schemas.comment).isRequired,
};

OrderComments.defaultProps = {
  comments: [],
};

export default OrderComments;
