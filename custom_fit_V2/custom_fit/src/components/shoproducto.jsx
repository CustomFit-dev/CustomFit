import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <svg className="card-image" xmlns="http://www.w3.org/2000/svg" width={70} height={70} fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6.825 4.138c.596 2.141-.36 3.593-2.389 4.117a4.4 4.4 0 0 1-2.018.054c-.048-.01.9 2.778 1.522 4.61l.41 1.205a.52.52 0 0 1-.346.659l-.593.19a.55.55 0 0 1-.69-.34L.184 6.99c-.696-2.137.662-4.309 2.564-4.8 2.029-.523 3.402 0 4.076 1.948zm-.868 2.221c.43-.112.561-.993.292-1.969-.269-.975-.836-1.675-1.266-1.563s-.561.994-.292 1.969.836 1.675 1.266 1.563m3.218-2.221c-.596 2.141.36 3.593 2.389 4.117a4.4 4.4 0 0 0 2.018.054c.048-.01-.9 2.778-1.522 4.61l-.41 1.205a.52.52 0 0 0 .346.659l.593.19c.289.092.6-.06.69-.34l2.536-7.643c.696-2.137-.662-4.309-2.564-4.8-2.029-.523-3.402 0-4.076 1.948m.868 2.221c-.43-.112-.561-.993-.292-1.969.269-.975.836-1.675 1.266-1.563s.561.994.292 1.969-.836 1.675-1.266 1.563" />
        </svg>
        <div className="card-price-tag">
          <span className="price-value">%50</span>
        </div>
        <svg textRendering="geometricPrecision" shapeRendering="geometricPrecision" height={50} width={50} viewBox="0 0 200 350" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" className="ring-1">
          <defs>
            <radialGradient gradientTransform="matrix(1 0 0 0.860612 0.5 0.618787)" gradientUnits="objectBoundingBox" spreadMethod="pad" r="0.5" cy={0} cx={0} id="ebT4AgJ0WZ62-fill">
              <stop stopColor="#313131" offset="48.4041%" id="ebT4AgJ0WZ62-fill-0" />
              <stop stopColor="#a5a5a5" offset="68.1857%" id="ebT4AgJ0WZ62-fill-1" />
              <stop stopColor="#282828" offset="84.0109%" id="ebT4AgJ0WZ62-fill-2" />
            </radialGradient>
            <radialGradient gradientTransform="matrix(0.999964 0.008506 -0.012489 1.468176 0.496001 0)" gradientUnits="objectBoundingBox" spreadMethod="pad" r="0.803687" cy={0} cx={0} id="ebT4AgJ0WZ63-fill">
              <stop stopColor="#313131" offset="66.5167%" id="ebT4AgJ0WZ63-fill-0" />
              <stop stopColor="#929292" offset="79.3157%" id="ebT4AgJ0WZ63-fill-1" />
              <stop stopColor="#282828" offset="100%" id="ebT4AgJ0WZ63-fill-2" />
            </radialGradient>
          </defs>
          <path fill="url(#ebT4AgJ0WZ62-fill)" transform="translate(.79738 0.07381)" d="M52.80126,148.52946c0-54.09424,43.1045-97.44452,97.19874-97.44452c54.02838,0,97.83949,43.74533,97.9461,97.74875c0,4.48899-15.841036,8.59818-21.21294,3.870883-.611021-2.50634-.402559-3.828048,0-4.910803c7.308634-19.657872-34.28954-75.61349-76.73315-75.61349s-76.85095,34.40734-76.85095,76.85095s27.897301,76.44983,70.340911,76.44983c1.832594,0,10.881874-3.528414,14.410289,0c4.397368,5.041913,5.519605,8.849302,4.757083,12.041874-.919128,3.848258-1.140559,6.87447-4.632193,9.130546-2.6467.21463-5.32315.32404-8.02514.32404-54.09424,0-97.19874-44.35382-97.19874-98.44806h-.00001Z" />
          <path fill="url(#ebT4AgJ0WZ63-fill)" transform="matrix(1 0 0-1-20.148641 311.37469)" d="M268.094741,163.50711c0,54.09424-43.068431,97.94629-97.162671,97.94629s-97.94629-43.85205-97.94629-97.94629m9.892327,0c0,42.44361,45.610353,76.85095,88.053963,76.85095s97.162671-34.40734,97.162671-76.85095" />
        </svg>
        <svg textRendering="geometricPrecision" shapeRendering="geometricPrecision" height={45} width={45} viewBox="0 0 200 350" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" className="ring-2">
          <defs>
            <radialGradient gradientTransform="matrix(1 0 0 0.860612 0.5 0.618787)" gradientUnits="objectBoundingBox" spreadMethod="pad" r="0.5" cy={0} cx={0} id="ebT4AgJ0WZ62-fill">
              <stop stopColor="#313131" offset="48.4041%" id="ebT4AgJ0WZ62-fill-0" />
              <stop stopColor="#a5a5a5" offset="68.1857%" id="ebT4AgJ0WZ62-fill-1" />
              <stop stopColor="#282828" offset="84.0109%" id="ebT4AgJ0WZ62-fill-2" />
            </radialGradient>
            <radialGradient gradientTransform="matrix(0.999964 0.008506 -0.012489 1.468176 0.496001 0)" gradientUnits="objectBoundingBox" spreadMethod="pad" r="0.803687" cy={0} cx={0} id="ebT4AgJ0WZ63-fill">
              <stop stopColor="#313131" offset="66.5167%" id="ebT4AgJ0WZ63-fill-0" />
              <stop stopColor="#929292" offset="79.3157%" id="ebT4AgJ0WZ63-fill-1" />
              <stop stopColor="#282828" offset="100%" id="ebT4AgJ0WZ63-fill-2" />
            </radialGradient>
          </defs>
          <path fill="url(#ebT4AgJ0WZ62-fill)" transform="translate(.79738 0.07381)" d="M52.80126,148.52946c0-54.09424,43.1045-97.44452,97.19874-97.44452c54.02838,0,97.83949,43.74533,97.9461,97.74875c0,4.48899-15.841036,8.59818-21.21294,3.870883-.611021-2.50634-.402559-3.828048,0-4.910803c7.308634-19.657872-34.28954-75.61349-76.73315-75.61349s-76.85095,34.40734-76.85095,76.85095s27.897301,76.44983,70.340911,76.44983c1.832594,0,10.881874-3.528414,14.410289,0c4.397368,5.041913,5.519605,8.849302,4.757083,12.041874-.919128,3.848258-1.140559,6.87447-4.632193,9.130546-2.6467.21463-5.32315.32404-8.02514.32404-54.09424,0-97.19874-44.35382-97.19874-98.44806h-.00001Z" />
          <path fill="url(#ebT4AgJ0WZ63-fill)" transform="matrix(1 0 0-1-20.148641 311.37469)" d="M268.094741,163.50711c0,54.09424-43.068431,97.94629-97.162671,97.94629s-97.94629-43.85205-97.94629-97.94629m9.892327,0c0,42.44361,45.610353,76.85095,88.053963,76.85095s97.162671-34.40734,97.162671-76.85095" />
        </svg>
        <svg textRendering="geometricPrecision" shapeRendering="geometricPrecision" height={50} width={50} viewBox="0 0 200 300" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" className="ring-3">
          <defs>
            <radialGradient gradientTransform="matrix(1 0 0 0.860612 0.5 0.618787)" gradientUnits="objectBoundingBox" spreadMethod="pad" r="0.5" cy={0} cx={0} id="ebT4AgJ0WZ62-fill">
              <stop stopColor="#313131" offset="48.4041%" id="ebT4AgJ0WZ62-fill-0" />
              <stop stopColor="#a5a5a5" offset="68.1857%" id="ebT4AgJ0WZ62-fill-1" />
              <stop stopColor="#282828" offset="84.0109%" id="ebT4AgJ0WZ62-fill-2" />
            </radialGradient>
            <radialGradient gradientTransform="matrix(0.999964 0.008506 -0.012489 1.468176 0.496001 0)" gradientUnits="objectBoundingBox" spreadMethod="pad" r="0.803687" cy={0} cx={0} id="ebT4AgJ0WZ63-fill">
              <stop stopColor="#313131" offset="66.5167%" id="ebT4AgJ0WZ63-fill-0" />
              <stop stopColor="#929292" offset="79.3157%" id="ebT4AgJ0WZ63-fill-1" />
              <stop stopColor="#282828" offset="100%" id="ebT4AgJ0WZ63-fill-2" />
            </radialGradient>
          </defs>
          <path fill="url(#ebT4AgJ0WZ62-fill)" transform="translate(.79738 0.07381)" d="M52.80126,148.52946c0-54.09424,43.1045-97.44452,97.19874-97.44452c54.02838,0,97.83949,43.74533,97.9461,97.74875c0,4.48899-15.841036,8.59818-21.21294,3.870883-.611021-2.50634-.402559-3.828048,0-4.910803c7.308634-19.657872-34.28954-75.61349-76.73315-75.61349s-76.85095,34.40734-76.85095,76.85095s27.897301,76.44983,70.340911,76.44983c1.832594,0,10.881874-3.528414,14.410289,0c4.397368,5.041913,5.519605,8.849302,4.757083,12.041874-.919128,3.848258-1.140559,6.87447-4.632193,9.130546-2.6467.21463-5.32315.32404-8.02514.32404-54.09424,0-97.19874-44.35382-97.19874-98.44806h-.00001Z" />
          <path fill="url(#ebT4AgJ0WZ63-fill)" transform="matrix(1 0 0-1-20.148641 311.37469)" d="M268.094741,163.50711c0,54.09424-43.068431,97.94629-97.162671,97.94629s-97.94629-43.85205-97.94629-97.94629m9.892327,0c0,42.44361,45.610353,76.85095,88.053963,76.85095s97.162671-34.40734,97.162671-76.85095" />
        </svg>
        <div className="card-info">
          <div className="left-info">
            <span className="product-title">PRODUCT NAME
              <p>Lorem ipsum dolor sit amet</p>
              <div className="star-rating">
                <span className="star">
                  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                </span>
                <span className="star">
                  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                </span>
                <span className="star">
                  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                </span>
                <span className="star">
                  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                  </svg>
                </span>
                <span className="star">
                  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                  </svg>
                </span>
              </div>
            </span>
          </div>
          <div className="right-info">
            <ul className="features-list">
              <li className="list-item">
                <p className="feature-sub-title">Your title</p>
                <span className="feature-desc">Lorem ipsum dolor sit amet</span>
              </li>
              <li className="list-item">
                <p className="feature-sub-title">Your title</p>
                <span className="feature-desc">Lorem ipsum dolor sit amet</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="add-to-cart-btn">
          <button>Add to cart</button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  ul {
    list-style: none;
    padding: 0;
  }
  .card {
    width: 350px;
    height: 440px;
    background: #1b1b1b;
    position: relative;
    border-radius: 12px;
    box-shadow: 0px 10px 10px 0 #1b1b1b;
  }
  .card .card-image {
    position: relative;
    height: 54%;
    width: 45%;
    display: block;
    margin: auto;
    color: #c8c8c8;
    filter: drop-shadow(0 0 5px #111111);
  }

  .card .card-info {
    height: 100%;
    border-radius: 12px 12px 0 0;
    width: 100%;
    color: #fff;
    display: flex;
    background: linear-gradient(#4f4f4f64, transparent);
  }
  .card .card-info {
    font-size: 0.8rem;
    max-height: 190px;
  }
  .card .card-info .left-info,
  .card .card-info .right-info {
    flex: 1;
    padding: 16px;
  }
  .card .card-info .left-info .product-title {
    font-size: 14px;
    line-height: 1.1;
    letter-spacing: 0.4px;
    font-weight: bold;
    margin-bottom: 18px;
    display: block;
  }
  .card .card-info p {
    font-size: 10px;
    margin-top: 12px;
    line-height: 1.2;
    letter-spacing: 0.3px;
    font-weight: normal;
  }
  .card .card-info .left-info .star-rating {
    display: flex;
    margin-top: 20px;
  }
  .card .card-info .left-info .star-rating span {
    display: block;
    width: 16px;
    color: rgb(242, 99, 255);
  }
  .card .card-info .right-info {
    margin: 0;
    position: relative;
  }
  .card .card-info .right-info::before {
    position: absolute;
    content: "";
    width: 2px;
    height: calc(100% - 20px);
    background: #df29ff;
    left: -5px;
  }

  .card .card-info .right-info ul {
    margin: 0;
    list-style: none;
  }
  .card .card-info .right-info ul li {
    padding: 0;
    font-size: 10px;
    margin: 10px 0;
  }
  .card .card-info .right-info ul li:first-child {
    margin-top: 0;
  }
  .card .card-info .right-info ul li p.feature-sub-title {
    font-size: 8px;
    margin-bottom: 5px;
    letter-spacing: 0.3px;
    line-height: 0.9;
    color: #e96dff;
    font-weight: bold;
    text-transform: uppercase;
  }
  .card .card-info .right-info ul li .feature-sub-title:first-child {
    margin-top: 0;
  }
  .add-to-cart-btn {
    display: flex;
    position: absolute;
    bottom: 10px;
    margin-top: 20px;
    width: 100%;
    flex: 1;
    flex-basis: 200px;
    margin: auto;
    justify-content: center;
  }
  .add-to-cart-btn button {
    border: none;
    font-size: 7px;
    background: linear-gradient(
      45deg,
      transparent,
      #f532f1 40%,
      #f532f1,
      #a141fb 60%,
      transparent
    );
    padding: 6px 10px;
    color: #fff;
    font-weight: bold;
    background-size: 200%;
    background-position: 0% 0%;
    text-transform: uppercase;
    border-radius: 30px;
    transition: 0.4s ease-in-out;
  }
  .card .card-price-tag {
    position: absolute;
    right: 12px;
    top: 0;
    color: #fff;
    font-size: 0.6rem;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 0 0 5px 5px;
    background: linear-gradient(#df29ff, #dc0ba5);
  }
  .card svg {
    position: absolute;
  }
  .card::before {
    position: absolute;
    content: "";
    height: 90px;
    width: 90px;
    border-radius: 50%;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(245, 46, 255);
    filter: blur(25px);
    box-shadow: 0 0 70px 0 #f51cf1;
  }
  .card svg.ring-1 {
    top: 16px;
    left: 16px;
    rotate: 210deg;
    filter: blur(1px) brightness(0.7);
    transition: 1s ease-in-out;
  }
  .card svg.ring-2 {
    top: 40%;
    right: 0;
    rotate: 150deg;
    filter: brightness(0.5);
    transition: 0.8s ease-in-out;
  }
  .card svg.ring-3 {
    top: 40%;
    left: 5px;
    rotate: 270deg;
    filter: brightness(0.7);
    transition: 0.9s ease-in-out;
  }

  .card:hover svg.ring-1 {
    top: 6px;
    left: 20%;
    rotate: 230deg;
    scale: 1.25;
  }
  .card:hover svg.ring-2 {
    top: 45%;
    right: 15px;
    rotate: 210deg;
    filter: brightness(0.9);
    scale: 1.3;
  }
  .card:hover svg.ring-3 {
    top: 32%;
    left: 5%;
    rotate: 210deg;
    filter: brightness(1);
    scale: 1.3;
  }

  .card .add-to-cart-btn button:hover {
    background-position: 100% 100%;
  }`;

export default Card;
