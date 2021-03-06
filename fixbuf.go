package wave

import "strconv"

// FixBuf represents a fixed-sized buffer.
type FixBuf struct {
	t    Typ
	tups [][]interface{}
}

func newFixBuf(t Typ, n int) *FixBuf {
	return &FixBuf{t, make([][]interface{}, n)}
}

func (b *FixBuf) put(ixs interface{}) {
	if xs, ok := ixs.([]interface{}); ok {
		if len(xs) == len(b.tups) {
			for i, x := range xs {
				b.seti(i, x)
			}
		}
	}
}

func (b *FixBuf) set(k string, v interface{}) {
	if i, err := strconv.Atoi(k); err == nil {
		b.seti(i, v)
	}
}

func (b *FixBuf) seti(i int, v interface{}) {
	if i >= 0 && i < len(b.tups) {
		if v == nil {
			b.tups[i] = nil
		} else if tup, ok := b.t.match(v); ok {
			b.tups[i] = tup
		}
	}
}

func (b *FixBuf) get(k string) (Cur, bool) {
	if i, err := strconv.Atoi(k); err == nil {
		return b.geti(i)
	}
	return Cur{}, false
}

func (b *FixBuf) geti(i int) (Cur, bool) {
	if i >= 0 && i < len(b.tups) {
		return Cur{b.t, b.tups[i]}, true
	}
	return Cur{}, false
}

func (b *FixBuf) dump() BufD {
	return BufD{F: &FixBufD{b.t.f, b.tups, len(b.tups)}}
}

func loadFixBuf(ns *Namespace, b *FixBufD) *FixBuf {
	t := ns.make(b.F)
	if len(b.D) == 0 {
		n := b.N
		if n <= 0 {
			n = 10
		}
		return newFixBuf(t, n)
	}
	return &FixBuf{t, b.D}
}
