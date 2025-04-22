import React, { useState, useEffect } from "react";
import "./notification.css"

export default function Notification() {
    const [notification, setNotification] = useState({
        recipient: '',
        subject: '',
        message: '',
        startFrom: '',
        perBatch: '',
        coolingPeriod: ''
    });

    // Load notification data from localStorage on component mount
    useEffect(() => {
        const savedNotification = localStorage.getItem('notificationData');
        if (savedNotification) {
            setNotification(JSON.parse(savedNotification));
        }
    }, []);

    // Save notification data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('notificationData', JSON.stringify(notification));
    }, [notification]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNotification(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the notification data to your backend
        console.log('Notification data:', notification);
        // Clear form after submission
        setNotification({
            recipient: '',
            subject: '',
            message: '',
            startFrom: '',
            perBatch: '',
            coolingPeriod: ''
        });
    };

    return (
        <>
            <div className="boss_not">
            <div><h1>Notification to verified vendors</h1></div>
                <div className="not_container">
                <div>
                    <form onSubmit={handleSubmit}>
                    <div className="mailbox">
                    Send a email
                    </div>
                    <label htmlFor="recipient">Being sent to:</label>
                    <br />
                    <input 
                        className="not_inp" 
                        type="text"
                        name="recipient"
                        value={notification.recipient}
                        onChange={handleInputChange}
                    />
                    <br /> <br />
                    <label htmlFor="subject">Subject:</label>
                    <br />
                    <input 
                        className="not_inp" 
                        type="text"
                        name="subject"
                        value={notification.subject}
                        onChange={handleInputChange}
                    />
                    <br /><br />
                    <label htmlFor="message">Message</label>
                    <br />
                    <input 
                        className="not_inp1" 
                        type="text"
                        name="message"
                        value={notification.message}
                        onChange={handleInputChange}
                    />
                    <div className="not_class">
                       
                        <div>
                            <label htmlFor="startFrom">Start from</label>
                            <br />
                            <input 
                                className="not_inp2" 
                                type="number"
                                name="startFrom"
                                value={notification.startFrom}
                                onChange={handleInputChange}
                            />
                            
                            
                        </div>
                        <div>
                            <label htmlFor="perBatch">Per batch</label>
                            <br />
                            <input 
                                className="not_inp2" 
                                type="number"
                                name="perBatch"
                                value={notification.perBatch}
                                onChange={handleInputChange}
                            />
                            
                        </div>
                        
                        <div>
                            <label htmlFor="coolingPeriod">Cooling period</label>
                           <br />
                            <input 
                                className="not_inp2" 
                                type="number"
                                name="coolingPeriod"
                                value={notification.coolingPeriod}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn5">Submit</button>
                    </form>
                    </div>
            </div>
            </div>
        </>
    )
    
};
