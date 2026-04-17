## Why it matters

Small-to-large is one of those ideas that shows up in problems that look impossible until you realize you can keep reusing the heavy bucket.

## Mental checklist

- Is each element moving only to a larger container?
- Can I avoid clearing the heavy child's contribution?
- Is there an offline ordering trick that makes the state local?

## Red flags

- Forgetting to rollback light-child effects when the query is local
- Mixing subtree and path queries without stating the invariant
