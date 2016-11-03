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
      <div className="feed-activity-list m-b">
        <table style={{ width: '100%' }}>
          <tbody>
            {comments.map(({ body, author, createdAt }, idx) => (
              <tr className="feed-element" key={`order-comment-${idx}`}>
                <td>
                  <div className="small text-muted">
                    <FaIcon name="clock-o" />
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
