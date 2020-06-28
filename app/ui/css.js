module.exports = `
    <style>
        *{
            font-family: 'San Francisco', 'Segoe UI', sans-serif;
        }
        
        .break {
            flex-wrap: wrap;
        }
        
        input, button{
            margin: 0;
        }

        .row input{
            flex: 1
        }

        button.block{
            width: 100%;
        }

        .button{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 24px;
        }

        .button[uxp-variant="action"]{
            width: 24px;
            border-radius: 50%;
            background: #1473E6;
        }

        .button[uxp-variant="action"] svg path{
            fill: #fff;
            width: 20px;
            height: 20px;
        }
        
        .button[uxp-variant="cta"]{
            width: 100%;
            height: 28px;
            line-height: 28px;
            font-weight: 600;
            font-size: 13px;
            background: #1473E6;
            color: #fff;
            border-radius: 14px;
            margin: 0;
        }

        .ui-itemSelected-true #warning,
        .ui-itemSelected-false #app{
            display: none;
        }
        
        .ui-currentScreen-customize #pickScreen,
        .ui-currentScreen-pick #customizeScreen{
            display: none;
        }
    </style>
`;