function js_beautify(y, q) {
	function B() {
		for (; m.length && (" " === m[m.length - 1] || m[m.length - 1] === C);) m.pop()
	}

	function v(b) {
		return "[EXPRESSION]" === b || "[INDENTED-EXPRESSION]" === b
	}

	function g(b) {
		c.eat_next_space = !1;
		if (!G || !v(c.mode))
			if (b = "undefined" === typeof b ? !0 : b, c.if_line = !1, B(), m.length) {
				"\n" === m[m.length - 1] && b || (D = !0, m.push("\n"));
				for (b = 0; b < c.indentation_level; b += 1) m.push(C);
				c.var_line && c.var_line_reindented && (" " === Q ? m.push("    ") : m.push(C))
			}
	}

	function n() {
		if (c.eat_next_space) c.eat_next_space = !1;
		else {
			var b =
				" ";
			m.length && (b = m[m.length - 1]);
			" " !== b && "\n" !== b && b !== C && m.push(" ")
		}
	}

	function e() {
		D = !1;
		c.eat_next_space = !1;
		m.push(p)
	}

	function l() {
		m.length && m[m.length - 1] === C && m.pop()
	}

	function u(b) {
		c && K.push(c);
		c = {
			previous_mode: c ? c.mode : "BLOCK",
			mode: b,
			var_line: !1,
			var_line_tainted: !1,
			var_line_reindented: !1,
			in_html_comment: !1,
			if_line: !1,
			in_case: !1,
			eat_next_space: !1,
			indentation_baseline: -1,
			indentation_level: c ? c.indentation_level + (c.var_line && c.var_line_reindented ? 1 : 0) : U
		}
	}

	function v(b) {
		return "[EXPRESSION]" === b || "[INDENTED-EXPRESSION]" ===
			b
	}

	function A(b) {
		return "[EXPRESSION]" === b || "[INDENTED-EXPRESSION]" === b || "(EXPRESSION)" === b
	}

	function z() {
		L = "DO_BLOCK" === c.mode;
		0 < K.length && (c = K.pop())
	}

	function t(b, a) {
		for (var c = 0; c < a.length; c += 1)
			if (a[c] === b) return !0;
		return !1
	}

	function d() {
		for (var a = 0, c = 0, d = m.length - 1; 0 <= d; d--) switch (m[d]) {
		case ":":
			0 === a && c++;
			break;
		case "?":
			if (0 === a) {
				if (0 === c) return !0;
				c--
			}
			break;
		case "{":
			if (0 === a) return !1;
			a--;
			break;
		case "(":
		case "[":
			a--;
			break;
		case ")":
		case "]":
		case "}":
			a++
		}
	}

	function R() {
		E = 0;
		if (a >= w) return ["", "TK_EOF"];
		J = !1;
		var b = h.charAt(a);
		a += 1;
		if (G && v(c.mode)) {
			for (var d = 0; t(b, N);) {
				"\n" === b ? (B(), m.push("\n"), D = !0, d = 0) : d = "\t" === b ? d + 4 : d + 1;
				if (a >= w) return ["", "TK_EOF"];
				b = h.charAt(a);
				a += 1
			} - 1 === c.indentation_baseline && (c.indentation_baseline = d);
			if (D) {
				var e;
				for (e = 0; e < c.indentation_level + 1; e += 1) m.push(C);
				if (-1 !== c.indentation_baseline)
					for (e = 0; e < d - c.indentation_baseline; e++) m.push(" ")
			}
		} else {
			for (; t(b, N);) {
				"\n" === b && (E += 1);
				if (a >= w) return ["", "TK_EOF"];
				b = h.charAt(a);
				a += 1
			}
			if (S && 1 < E)
				for (e = 0; e < E; e += 1) g(0 === e), D = !0;
			J = 0 < E
		}
		if (t(b,
				M)) {
			if (a < w)
				for (; t(h.charAt(a), M) && (b += h.charAt(a), a += 1, a !== w););
			if (a !== w && b.match(/^[0-9]+[Ee]$/) && ("-" === h.charAt(a) || "+" === h.charAt(a))) return d = h.charAt(a), a += 1, e = R(a), b += d + e[0], [b, "TK_WORD"];
			if ("in" === b) return [b, "TK_OPERATOR"];
			!J || "TK_OPERATOR" === f || c.if_line || !S && "var" === k || g();
			return [b, "TK_WORD"]
		}
		if ("(" === b || "[" === b) return [b, "TK_START_EXPR"];
		if (")" === b || "]" === b) return [b, "TK_END_EXPR"];
		if ("{" === b) return [b, "TK_START_BLOCK"];
		if ("}" === b) return [b, "TK_END_BLOCK"];
		if (";" === b) return [b, "TK_SEMICOLON"];
		if ("/" === b) {
			d = "";
			e = !0;
			if ("*" === h.charAt(a)) {
				a += 1;
				if (a < w)
					for (;
						("*" !== h.charAt(a) || !h.charAt(a + 1) || "/" !== h.charAt(a + 1)) && a < w;) {
						b = h.charAt(a);
						d += b;
						if ("\r" === b || "\n" === b) e = !1;
						a += 1;
						if (a >= w) break
					}
				a += 2;
				return e ? ["/*" + d + "*/", "TK_INLINE_COMMENT"] : ["/*" + d + "*/", "TK_BLOCK_COMMENT"]
			}
			if ("/" === h.charAt(a)) {
				for (d = b;
					"\r" !== h.charAt(a) && "\n" !== h.charAt(a) && !(d += h.charAt(a), a += 1, a >= w););
				a += 1;
				J && g();
				return [d, "TK_COMMENT"]
			}
		}
		if ("'" === b || '"' === b || "/" === b && ("TK_WORD" === f && t(k, ["return", "do"]) || "TK_START_EXPR" === f || "TK_START_BLOCK" ===
				f || "TK_END_BLOCK" === f || "TK_OPERATOR" === f || "TK_EQUALS" === f || "TK_EOF" === f || "TK_SEMICOLON" === f)) {
			d = b;
			e = !1;
			if (a < w)
				if ("/" === d)
					for (var l = !1; e || l || h.charAt(a) !== d;) {
						if (b += h.charAt(a), e ? e = !1 : (e = "\\" === h.charAt(a), "[" === h.charAt(a) ? l = !0 : "]" === h.charAt(a) && (l = !1)), a += 1, a >= w) return [b, "TK_STRING"]
					} else
						for (; e || h.charAt(a) !== d;)
							if (b += h.charAt(a), e = e ? !1 : "\\" === h.charAt(a), a += 1, a >= w) return [b, "TK_STRING"];
			a += 1;
			b += d;
			if ("/" === d)
				for (; a < w && t(h.charAt(a), M);) b += h.charAt(a), a += 1;
			return [b, "TK_STRING"]
		}
		if ("#" === b && (d = "#",
				a < w && t(h.charAt(a), T))) {
			do b = h.charAt(a), d += b, a += 1; while (a < w && "#" !== b && "=" !== b);
			"#" !== b && ("[" === h.charAt(a) && "]" === h.charAt(a + 1) ? (d += "[]", a += 2) : "{" === h.charAt(a) && "}" === h.charAt(a + 1) && (d += "{}", a += 2));
			return [d, "TK_WORD"]
		}
		if ("<" === b && "<!--" === h.substring(a - 1, a + 3)) return a += 3, c.in_html_comment = !0, ["<!--", "TK_COMMENT"];
		if ("-" === b && c.in_html_comment && "-->" === h.substring(a - 1, a + 2)) return c.in_html_comment = !1, a += 2, J && g(), ["-->", "TK_COMMENT"];
		if (t(b, O)) {
			for (; a < w && t(b + h.charAt(a), O) && !(b += h.charAt(a),
					a += 1, a >= w););
			return "=" === b ? [b, "TK_EQUALS"] : [b, "TK_OPERATOR"]
		}
		return [b, "TK_UNKNOWN"]
	}
	var h, m, p, f, k, x, F, c, K, C, N, M, O, a, H, T, r, I, L, J, D, E;
	q = q ? q : {};
	var P = q.braces_on_own_line ? q.braces_on_own_line : !1;
	F = q.indent_size ? q.indent_size : 4;
	var Q = q.indent_char ? q.indent_char : " ",
		S = "undefined" === typeof q.preserve_newlines ? !0 : q.preserve_newlines,
		U = q.indent_level ? q.indent_level : 0,
		V = "undefined" === q.space_after_anon_function ? !1 : q.space_after_anon_function,
		G = "undefined" === typeof q.keep_array_indentation ? !1 : q.keep_array_indentation;
	D = !1;
	var w = y.length;
	for (C = ""; 0 < F;) C += Q, --F;
	h = y;
	F = "";
	f = "TK_START_EXPR";
	x = k = "";
	m = [];
	L = !1;
	N = ["\n", "\r", "\t", " "];
	M = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$".split("");
	T = "0123456789".split("");
	O = "+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::".split(" ");
	H = "continue try throw return var if switch case default for while break function".split(" ");
	K = [];
	u("BLOCK");
	for (a = 0;;) {
		I = R(a);
		p = I[0];
		I = I[1];
		if ("TK_EOF" === I) break;
		switch (I) {
		case "TK_START_EXPR":
			if ("[" === p) {
				if ("TK_WORD" === f || ")" === k) {
					t(k, H) && n();
					u("(EXPRESSION)");
					e();
					break
				}
				"[EXPRESSION]" === c.mode || "[INDENTED-EXPRESSION]" === c.mode ? "]" === x && "," === k ? ("[EXPRESSION]" === c.mode && (c.mode = "[INDENTED-EXPRESSION]", G || (c.indentation_level += 1)), u("[EXPRESSION]"), G || g()) : "[" === k ? ("[EXPRESSION]" === c.mode && (c.mode = "[INDENTED-EXPRESSION]", G || (c.indentation_level += 1)), u("[EXPRESSION]"), G || g()) : u("[EXPRESSION]") : u("[EXPRESSION]")
			} else u("(EXPRESSION)");
			";" === k || "TK_START_BLOCK" ===
				f ? g() : "TK_END_EXPR" !== f && "TK_START_EXPR" !== f && "TK_END_BLOCK" !== f && "." !== k && ("TK_WORD" !== f && "TK_OPERATOR" !== f ? n() : "function" === F ? V && n() : (t(k, H) || "catch" === k) && n());
			e();
			break;
		case "TK_END_EXPR":
			if ("]" === p)
				if (G) {
					if ("}" === k) {
						l();
						e();
						z();
						break
					}
				} else if ("[INDENTED-EXPRESSION]" === c.mode && "]" === k) {
				z();
				g();
				e();
				break
			}
			z();
			e();
			break;
		case "TK_START_BLOCK":
			"do" === F ? u("DO_BLOCK") : u("BLOCK");
			P ? ("TK_OPERATOR" !== f && ("return" == k ? n() : g(!0)), e(), c.indentation_level += 1) : ("TK_OPERATOR" !== f && "TK_START_EXPR" !== f ? "TK_START_BLOCK" ===
				f ? g() : n() : v(c.previous_mode) && "," === k && g(), c.indentation_level += 1, e());
			break;
		case "TK_END_BLOCK":
			z();
			P ? g() : "TK_START_BLOCK" === f ? D ? l() : B() : g();
			e();
			break;
		case "TK_WORD":
			if (L) {
				n();
				e();
				n();
				L = !1;
				break
			}
			if ("function" === p && (D || ";" === k) && "{" !== k)
				for (E = D ? E : 0, r = 0; r < 2 - E; r++) g(!1);
			if ("case" === p || "default" === p) {
				":" === k ? l() : (c.indentation_level--, g(), c.indentation_level++);
				e();
				c.in_case = !0;
				break
			}
			r = "NONE";
			"TK_END_BLOCK" === f ? t(p.toLowerCase(), ["else", "catch", "finally"]) ? P ? r = "NEWLINE" : (r = "SPACE", n()) : r = "NEWLINE" : "TK_SEMICOLON" !==
				f || "BLOCK" !== c.mode && "DO_BLOCK" !== c.mode ? "TK_SEMICOLON" === f && A(c.mode) ? r = "SPACE" : "TK_STRING" === f ? r = "NEWLINE" : "TK_WORD" === f ? r = "SPACE" : "TK_START_BLOCK" === f ? r = "NEWLINE" : "TK_END_EXPR" === f && (n(), r = "NEWLINE") : r = "NEWLINE";
			if ("TK_END_BLOCK" !== f && t(p.toLowerCase(), ["else", "catch", "finally"])) g();
			else if (t(p, H) || "NEWLINE" === r)
				if ("else" === k) n();
				else {
					if ("TK_START_EXPR" !== f && "=" !== k && "," !== k || "function" !== p) "return" === k || "throw" === k ? n() : "TK_END_EXPR" !== f ? "TK_START_EXPR" === f && "var" === p || ":" === k || ("if" === p && "else" ===
						F && "{" !== k ? n() : g()) : t(p, H) && ")" !== k && g()
				} else v(c.mode) && "," === k && "}" === x ? g() : "SPACE" === r && n();
			e();
			F = p;
			"var" === p && (c.var_line = !0, c.var_line_reindented = !1, c.var_line_tainted = !1);
			if ("if" === p || "else" === p) c.if_line = !0;
			break;
		case "TK_SEMICOLON":
			e();
			c.var_line = !1;
			c.var_line_reindented = !1;
			break;
		case "TK_STRING":
			"TK_START_BLOCK" === f || "TK_END_BLOCK" === f || "TK_SEMICOLON" === f ? g() : "TK_WORD" === f && n();
			e();
			break;
		case "TK_EQUALS":
			c.var_line && (c.var_line_tainted = !0);
			n();
			e();
			n();
			break;
		case "TK_OPERATOR":
			r = x = !0;
			c.var_line &&
				"," === p && A(c.mode) && (c.var_line_tainted = !1);
			if (c.var_line && "," === p)
				if (c.var_line_tainted) {
					e();
					c.var_line_reindented = !0;
					c.var_line_tainted = !1;
					g();
					break
				} else c.var_line_tainted = !1;
			if ("return" === k || "throw" === k) {
				n();
				e();
				break
			}
			if (":" === p && c.in_case) {
				e();
				g();
				c.in_case = !1;
				break
			}
			if ("::" === p) {
				e();
				break
			}
			if ("," === p) {
				c.var_line ? c.var_line_tainted ? (e(), g(), c.var_line_tainted = !1) : (e(), n()) : "TK_END_BLOCK" === f && "(EXPRESSION)" !== c.mode ? (e(), "OBJECT" === c.mode && "}" === k ? g() : n()) : "OBJECT" === c.mode ? (e(), g()) : (e(), n());
				break
			} else t(p, ["--", "++", "!"]) || t(p, ["-", "+"]) && (t(f, ["TK_START_BLOCK", "TK_START_EXPR", "TK_EQUALS", "TK_OPERATOR"]) || t(k, H)) ? (r = x = !1, ";" === k && A(c.mode) && (x = !0), "TK_WORD" === f && t(k, H) && (x = !0), "BLOCK" !== c.mode || "{" !== k && ";" !== k || g()) : "." === p ? x = !1 : ":" !== p || d() || (c.mode = "OBJECT", x = !1);
			x && n();
			e();
			r && n();
			break;
		case "TK_BLOCK_COMMENT":
			x = p.split(/\x0a|\x0d\x0a/);
			if (/^\/\*\*/.test(p))
				for (g(), m.push(x[0]), r = 1; r < x.length; r++) g(), m.push(" "), m.push(x[r].replace(/^\s\s*|\s\s*$/, ""));
			else
				for (1 < x.length ? (g(), B()) :
					n(), r = 0; r < x.length; r++) m.push(x[r]), m.push("\n");
			g();
			break;
		case "TK_INLINE_COMMENT":
			n();
			e();
			A(c.mode) ? n() : g();
			break;
		case "TK_COMMENT":
			J ? g() : n();
			e();
			g();
			break;
		case "TK_UNKNOWN":
			e()
		}
		x = k;
		f = I;
		k = p
	}
	return m.join("")
		.replace(/[\n ]+$/, "")
}
String.prototype.has = function (y) {
	return -1 < this.indexOf(y)
};

function jsmin(y, q) {
	function B(d) {
		return -1 != d && ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_$\\".has(d) || 126 < d.charCodeAt(0))
	}

	function v() {
		var d = A;
		if (z == t) return -1;
		A = -1; - 1 == d && (d = y.charAt(z), ++z);
		return " " <= d || "\n" == d ? d : "\r" == d ? "\n" : " "
	}

	function g() {
		return A = v()
	}

	function n() {
		var d = v();
		if ("/" == d) switch (g()) {
		case "/":
			for (;;)
				if (d = v(), "\n" >= d) return d;
		case "*":
			if (v(), "!" == g()) {
				v();
				for (var e = "/*!";;) switch (d = A, z == t ? d = -1 : (A = -1, -1 == d && (d = y.charAt(z), ++z), d = " " <= d || "\n" == d || "\r" == d ? d :
					" "), d) {
				case "*":
					if ("/" == g()) return v(), e + "*/";
					break;
				case -1:
					throw "Error: Unterminated comment.";
				default:
					e += d
				}
			} else
				for (;;) switch (v()) {
				case "*":
					if ("/" == g()) return v(), " ";
					break;
				case -1:
					throw "Error: Unterminated comment.";
				}
		}
		return d
	}

	function e(d) {
		var e = [];
		1 == d && e.push(l);
		if (3 > d && (l = u, "'" == l || '"' == l))
			for (;;) {
				e.push(l);
				l = v();
				if (l == u) break;
				if ("\n" >= l) throw "Error: unterminated string literal: " + l;
				"\\" == l && (e.push(l), l = v())
			}
		u = n();
		if ("/" == u && "(,=:[!&|".has(l)) {
			e.push(l);
			for (e.push(u);;) {
				l = v();
				if ("/" == l) break;
				else if ("\\" == l) e.push(l), l = v();
				else if ("\n" >= l) throw "Error: unterminated Regular Expression literal";
				e.push(l)
			}
			u = n()
		}
		return e.join("")
	}
	if (void 0 === y) y = "", q = 2;
	else if (void 0 === q || 1 > q || 3 < q) q = 2;
	var l = "",
		u = "",
		A = -1,
		z = 0,
		t = y.length;
	return ret = function () {
		var d = [];
		l = "\n";
		for (d.push(e(3)); - 1 != l;) switch (l) {
		case " ":
			B(u) ? d.push(e(1)) : d.push(e(2));
			break;
		case "\n":
			switch (u) {
			case "{":
			case "[":
			case "(":
			case "+":
			case "-":
				d.push(e(1));
				break;
			case " ":
				d.push(e(3));
				break;
			default:
				B(u) ? d.push(e(1)) : 1 == q && "\n" != u ? d.push(e(1)) :
					d.push(e(2))
			}
			break;
		default:
			switch (u) {
			case " ":
				if (B(l)) {
					d.push(e(1));
					break
				}
				d.push(e(3));
				break;
			case "\n":
				if (1 == q && "\n" != l) d.push(e(1));
				else switch (l) {
				case "}":
				case "]":
				case ")":
				case "+":
				case "-":
				case '"':
				case "'":
					3 == q ? d.push(e(3)) : d.push(e(1));
					break;
				default:
					B(l) ? d.push(e(1)) : d.push(e(3))
				}
				break;
			default:
				d.push(e(1))
			}
		}
		return d.join("")
	}(y)
};
