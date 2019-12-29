#include "stringFunc.h"
#include <codecvt>

std::string Utils::GetCadChar(const char* str)
{
	int len = 256;
	wchar_t* wstr = new wchar_t[(len + 1) * 2];

	_memccpy(wstr, str, '\r', (len + 1) * 2);

	std::wstring_convert<std::codecvt<wchar_t, char, mbstate_t>> converter(new std::codecvt<wchar_t, char, mbstate_t>("chs"));

	std::string strRet = converter.to_bytes(wstr);

	return strRet;
}