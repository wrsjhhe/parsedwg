#pragma once

namespace Utils
{
	struct RGBA
	{
		RGBA():r(0),g(0),b(0),a(0)
		{}

		RGBA(short _c) :r(_c), g(_c), b(_c), a(0)
		{}

		RGBA(short _r, short _g, short _b) :r(_r), g(_g), b(_b), a(0)
		{}

		RGBA(short _r, short _g, short _b, short _a):r(_r),g(_g),b(_b),a(_a)
		{}

		short r;
		short g;
		short b;
		short a;
	};

	//从解析出来的RGB（不是正确的值）获取cad中的颜色编码
	short GetCadColorCode(unsigned int num);

	//从颜色编码到RGB
	bool GetRGBbyCadCode(short code, RGBA& rgb);

	//从解析出来的RGB（不是正确的值）获取真正的RGB值
	bool GetRealRGB(size_t num, RGBA& rgb);
}

