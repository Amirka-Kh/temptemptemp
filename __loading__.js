pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var logo = document.createElement('img');
        logo.src = ASSET_PREFIX + 'logo.png';
        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };

        // Sparkles container
        var sparklesContainer = document.createElement('div');
        sparklesContainer.id = 'sparkles-container';
        splash.appendChild(sparklesContainer);
    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    // Track existing sparkles and their positions
    var existingSparkles = [];

    var setProgress = function (value) {
        var sparklesContainer = document.getElementById('sparkles-container');
        if (!sparklesContainer) return;

        // Calculate the number of sparkles based on progress
        var maxSparkles = 100; // Maximum number of sparkles at 100% progress
        var sparkleCount = Math.floor(value * maxSparkles);

        // Add new sparkles if needed
        while (existingSparkles.length < sparkleCount) {
            var sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            // Random position within the container
            var x = Math.random() * 100; // Random X position (0% to 100%)
            var y = Math.random() * 100; // Random Y position (0% to 100%)

            sparkle.style.left = `${x}%`;
            sparkle.style.top = `${y}%`;

            sparklesContainer.appendChild(sparkle);
            existingSparkles.push(sparkle); // Track the new sparkle
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #000000;',
            '}',

            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #000000;',
            '}',

            '#application-splash {',
            '    position: absolute;',
            '    top: calc(50% - 132px);',
            '    width: 264px;',
            '    left: calc(50% - 132px);',
            '}',

            '#application-splash img {',
            '    width: 100%;',
            '}',

            '#sparkles-container {',
            '    position: relative;',
            '    width: 100%;',
            '    height: 50px;', // Adjust height as needed
            '    margin-top: 20px;',
            '}',

            '.sparkle {',
            '    position: absolute;',
            '    width: 2px;', // Small sparkles
            '    height: 2px;',
            '    background-color: rgb(255, 157, 0);',
            '    border-radius: 50%;',
            '    transform: translate(-50%, -50%);', // Center the sparkle
            '    animation: sparkle 1s infinite alternate ease-in-out;',
            '}',

            '@keyframes sparkle {',
            '    0% {',
            '        opacity: 0.5;',
            '        transform: translate(-50%, -50%) scale(1);',
            '    }',
            '    100% {',
            '        opacity: 1;',
            '        transform: translate(-50%, -50%) scale(1.2);',
            '    }',
            '}',

            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 170px;',
            '        left: calc(50% - 85px);',
            '    }',
            '}'
        ].join("\n");

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };

    createCss();

    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});