# Plot / Interval / Annotation
# No description available.
# ---
from synth import FakeCategoricalSeries
from telesync import Site, data, ui

site = Site()

page = site['/demo']

n = 20
f = FakeCategoricalSeries()
v = page.add('example', ui.plot_card(
    box='1 1 4 5',
    title='Categorical-Numeric',
    data=data('product price', n),
    vis=ui.vis([
        ui.mark(mark='interval', x='=product', y='=price', y_min=0, y_max=100),
        ui.mark(x='C10', y=80, label='point'),
        ui.mark(x='C13', label='vertical line'),
        ui.mark(y=40, label='horizontal line'),
        ui.mark(x='C6', x0='C3', label='vertical region'),
        ui.mark(y=70, y0=60, label='horizontal region')
    ])
))
v.data = [(c, x) for c, x, dx in [f.next() for _ in range(n)]]

page.sync()