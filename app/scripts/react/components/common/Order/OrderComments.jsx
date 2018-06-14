import React, { Component } from 'react'; import PropTypes from 'prop-types';
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
                <td className="comment__message__time">
                  <FaIcon name="clock-o" />
                  {createdAt}
                </td>
                <td className="comment__message__text">
                    {body}
                    {author && (
                      <span className="comment__message__author">
                        {'\u2014'}
                        <strong>
                          {author}
                        </strong>
                      </span>
                    )}
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
