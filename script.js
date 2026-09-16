// ============================================================
// AI/ML 2030 — interactivity
// 1) Category filter for the Keep/Update/Reduce/Add grid
// 2) Live credit-budget calculator (the required interactive feature)
// 3) Mobile nav toggle
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    // ---- 1. Decision-grid filter ----
    var filterButtons = document.querySelectorAll('.filter-button');
    var cards = document.querySelectorAll('.decision-card');

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterButtons.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');
            cards.forEach(function (card) {
                var match = filter === 'all' || card.getAttribute('data-category') === filter;
                card.classList.toggle('is-hidden', !match);
            });
        });
    });

    // ---- 2. Credit calculator ----
    var removeBoxes = document.querySelectorAll('#removeList input[type="checkbox"]');
    var addBoxes = document.querySelectorAll('#addList input[type="checkbox"]');
    var removeTotalEl = document.getElementById('removeTotal');
    var addTotalEl = document.getElementById('addTotal');
    var degreeTotalEl = document.getElementById('degreeTotal');
    var netLabelEl = document.getElementById('netLabel');
    var BASE_DEGREE_CREDITS = 160;

    function sumChecked(boxes) {
        var total = 0;
        boxes.forEach(function (box) {
            if (box.checked) total += parseInt(box.getAttribute('data-credits'), 10) || 0;
        });
        return total;
    }

    function recalc() {
        var removed = sumChecked(removeBoxes);
        var added = sumChecked(addBoxes);
        var net = added - removed;
        var degreeTotal = BASE_DEGREE_CREDITS + net;

        removeTotalEl.textContent = removed;
        addTotalEl.textContent = added;
        degreeTotalEl.textContent = degreeTotal;

        if (net === 0) {
            netLabelEl.textContent = 'Balanced — every credit added is funded by a credit removed';
            netLabelEl.className = 'balanced';
        } else if (net > 0) {
            netLabelEl.textContent = 'Unbalanced — adding ' + net + ' credit(s) beyond what you removed';
            netLabelEl.className = 'unbalanced';
        } else {
            netLabelEl.textContent = 'Unbalanced — ' + Math.abs(net) + ' freed credit(s) not yet reassigned';
            netLabelEl.className = 'unbalanced';
        }
    }

    removeBoxes.forEach(function (box) { box.addEventListener('change', recalc); });
    addBoxes.forEach(function (box) { box.addEventListener('change', recalc); });
    if (removeBoxes.length) recalc();

    // ---- 3. Mobile nav ----
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var isOpen = navLinks.style.display === 'flex';
            navLinks.style.display = isOpen ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = '#F7F5F0';
            navLinks.style.padding = '16px 28px';
            navLinks.style.borderBottom = '1px solid rgba(28,27,24,0.12)';
        });
    }

    // ---- Repo link placeholder ----
    var repoLink = document.getElementById('repoLink');
    if (repoLink) {
        repoLink.addEventListener('click', function (e) {
            if (repoLink.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    }
});