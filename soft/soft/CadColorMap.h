#pragma once

namespace Utils
{
	struct RGB
	{
		RGB():r(0),g(0),b(0)
		{}
		RGB(short _r, short _g, short _b):r(_r),g(_g),b(_b)
		{}
		short r;
		short g;
		short b;
	};

	//从解析出来的RGB（不是正确的值）获取cad中的颜色编码
	short GetCadColorCode(size_t num);

	//从颜色编码到RGB
	bool GetRGBbyCadCode(short code, RGB& rgb);

	//从解析出来的RGB（不是正确的值）获取真正的RGB值
	bool GetRealRGB(size_t num, RGB& rgb);
}

