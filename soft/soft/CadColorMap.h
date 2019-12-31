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

	//�ӽ���������RGB��������ȷ��ֵ����ȡcad�е���ɫ����
	short GetCadColorCode(unsigned int num);

	//����ɫ���뵽RGB
	bool GetRGBbyCadCode(short code, RGBA& rgb);

	//�ӽ���������RGB��������ȷ��ֵ����ȡ������RGBֵ
	bool GetRealRGB(size_t num, RGBA& rgb);
}

