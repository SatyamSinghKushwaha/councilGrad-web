
import React from 'react';


const TestimonialCard = ({ quote, name, description, avatarColor }) => {
return (
<article className="testimonial-card">
<p className="testimonial-quote">"{quote}"</p>


<div className="testimonial-user">
<div className="avatar" style={{ backgroundColor: avatarColor }} />
<div>
<p className="user-name">{name}</p>
<p className="user-desc">{description}</p>
</div>
</div>
</article>
);
};


export default TestimonialCard;