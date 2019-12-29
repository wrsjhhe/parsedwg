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

	//�ӽ���������RGB��������ȷ��ֵ����ȡcad�е���ɫ����
	short GetCadColorCode(size_t num);

	//����ɫ���뵽RGB
	bool GetRGBbyCadCode(short code, RGB& rgb);

	//�ӽ���������RGB��������ȷ��ֵ����ȡ������RGBֵ
	bool GetRealRGB(size_t num, RGB& rgb);
}

