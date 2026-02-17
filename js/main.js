// js/main.js - Compact version with equation wrapping support

document.addEventListener('DOMContentLoaded', function() {
    
    //========================================================================
    // 1. MATHJAX CONFIGURATION - Ensure equations wrap properly
    //========================================================================
    
    if (window.MathJax) {
        MathJax.startup = {
            ready: function() {
                MathJax.loader.load('[tex]/ams');
                MathJax.startup.defaultReady();
            }
        };
        
        MathJax.tex = {
            packages: { '[+]': ['ams'] },
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']]
        };
        
        MathJax.options = {
            renderActions: {
                addMenu: [0, '', ''] // Disable right-click menu
            }
        };
        
        MathJax.typesetPromise().then(() => {
            console.log('✓ MathJax rendering complete');
            
            // After MathJax renders, ensure all equations are wrapped properly
            const mjxElements = document.querySelectorAll('.MathJax, mjx-container');
            mjxElements.forEach(el => {
                el.style.overflow = 'visible';
                el.style.whiteSpace = 'normal';
                el.style.maxWidth = '100%';
            });
        });
    }

    //========================================================================
    // 2. APPLY COMPACT STYLES TO ALL ELEMENTS
    //========================================================================
    
    // Add compact class to all math blocks for consistency
    document.querySelectorAll('.math-block').forEach(el => {
        if (!el.classList.contains('compact')) {
            el.classList.add('compact');
        }
        
        // Ensure no overflow
        el.style.overflow = 'visible';
        el.style.whiteSpace = 'normal';
        el.style.wordWrap = 'break-word';
        el.style.maxWidth = '100%';
    });

    //========================================================================
    // 3. FORMULA COLORING - Navy blue for formulas, green for answers
    //========================================================================
    
    document.querySelectorAll('.math-block:not(.highlight)').forEach(el => {
        el.style.color = '#000080';
    });

    document.querySelectorAll('.math-block.highlight, .answer').forEach(el => {
        el.style.color = '#006400';
    });

    //========================================================================
    // 4. EQUATION NUMBERING - Compact
    //========================================================================
    
    let eqCounter = 1;
    document.querySelectorAll('.math-block:not(.no-number):not(.highlight)').forEach(eq => {
        if (!eq.querySelector('.eq-number')) {
            const num = document.createElement('span');
            num.className = 'eq-number';
            num.textContent = `(${eqCounter++})`;
            num.style.cssText = 'float: right; color: #ffffff; font-size: 9pt; margin-left: 0.2cm;';
            eq.appendChild(num);
        }
    });

    //========================================================================
    // 5. IMAGE SIZING - Ensure consistent height
    //========================================================================
    
    function setImageHeights() {
        const isMobile = window.innerWidth <= 768;
        const baseHeight = isMobile ? '6cm' : '10cm';
        
        document.querySelectorAll('.diagram-image, .graph-image').forEach(img => {
            img.style.height = baseHeight;
            img.style.width = 'auto';
            img.style.maxWidth = '90%';
        });
    }
    
    setImageHeights();
    window.addEventListener('resize', setImageHeights);

    //========================================================================
    // 6. PAGE NUMBER VERIFICATION
    //========================================================================
    
    document.querySelectorAll('.page-number').forEach((num, idx) => {
        if (!num.textContent.includes('Page')) {
            num.textContent = `Page ${idx + 1}`;
        }
    });

    //========================================================================
    // 7. FONT SIZE REDUCTION - Apply global if needed
    //========================================================================
    
    document.body.style.fontSize = '11pt';
    document.body.style.lineHeight = '1.2';

    //========================================================================
    // 8. FINAL CHECK - Ensure no scroll bars
    //========================================================================
    
    // Check for any elements causing horizontal scroll
    const checkOverflow = () => {
        const docWidth = document.documentElement.offsetWidth;
        const bodyWidth = document.body.offsetWidth;
        
        if (bodyWidth > docWidth) {
            console.warn('Horizontal overflow detected');
            document.body.style.overflowX = 'hidden';
        }
    };
    
    checkOverflow();
    window.addEventListener('load', checkOverflow);

    console.log('✓ Document initialized - compact mode active');
    console.log('  • Font size: 11pt base');
    console.log('  • Line height: 1.2');
    console.log('  • No scroll bars - equations wrap');
});