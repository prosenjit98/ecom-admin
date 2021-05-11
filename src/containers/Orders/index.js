import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrder } from '../../actions';

import Layout from '../../components/Layouts';
import Card from '../../UI/Card';
import './style.css';

const Orders = (props) => {
  const [type, setType] = useState("");
  const dispatch = useDispatch()
  const orders = useSelector(state => state.order);
  const onOrderUpdateConfirmation = (orderId) => {
    const payload = {
      orderId: orderId,
      type: type
    }
    dispatch(updateOrder(payload))
  }

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    }
    return "";
  }

  const findStatus = (order, type) => {
    return order.orderStatus.find(status => status.type === type)
  }

  return (
    <Layout sidebar>
      {orders && orders.orders.map((order, index) => {
        return (
          <Card headerLeft={`ORDER ID: ${order._id}`} key={index}>
            <div style={{ boxSizing: 'border-box', padding: "100px", display: 'flex', alignItems: 'center' }}>
              <div className="orderTrack">
                <div className={`orderStatus ${findStatus(order, 'ordered').isComplete ? 'green' : "grey"}`}>
                  <div className={`point ${findStatus(order, 'ordered').isComplete ? 'green' : "grey"}`}></div>
                  <div className="orderInfo">
                    <div className="status">Ordered</div>
                    <div className="date">{formatDate(findStatus(order, 'ordered').date)}</div>
                  </div>
                </div>
                <div className={`orderStatus ${findStatus(order, 'shipped').isComplete ? 'green' : "grey"}`}>
                  <div className={`point ${findStatus(order, 'packed').isComplete ? 'green' : "grey"}`}></div>
                  <div className="orderInfo">
                    <div className="status">Packed</div>
                    <div className="date">Fri, 2020</div>
                  </div>
                </div>
                <div className={`orderStatus ${findStatus(order, "delivered").isComplete ? 'green' : "grey"}`}>
                  <div className={`point ${findStatus(order, "shipped").isComplete ? 'green' : "grey"}`}></div>
                  <div className="orderInfo">
                    <div className="status">Delivered</div>
                    <div className="date">Fri, 2020</div>
                  </div>
                </div>
                <div className={`orderStatus ${findStatus(order, "delivered").isComplete ? 'green' : "grey"}`}>
                  <div className={`point ${findStatus(order, 'delivered').isComplete ? 'green' : "grey"}`}></div>
                  <div className="orderInfo">
                    <div className="status">Completed</div>
                    <div className="date">Fri, 2020</div>
                  </div>
                </div>
              </div>
              <div className="actions">
                {order && <select onChange={(e) => setType(e.target.value)}>
                  <option>Select Status</option>
                  {order.orderStatus.map(status => {
                    return (
                      <React.Fragment key={status.type}>
                        {!status.isComplete && <option value={status.type}>{status.type}</option>}
                      </React.Fragment>
                    )
                  })}
                </select>
                }
              </div>
              <div className="actions">
                <button onClick={() => onOrderUpdateConfirmation(order._id)}>Confirm</button>
              </div>
            </div>
          </Card>
        )
      })}

    </Layout>
  )
}

export default Orders