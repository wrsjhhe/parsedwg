#include "ParseObjectFactory.h"
#include "Line.h"
#include "Circle.h"
#include "LWPolyline.h"
#include "Polyline_3d.h"
#include "Layer.h"


#include <iostream>

CParseObjectFactory::CParseObjectFactory(const Dwg_Object* pObj):
	m_pObj(pObj)
{

}


CParseObjectFactory::~CParseObjectFactory()
{

}


std::string WstringToString(const std::wstring str)
{// wstringתstring
	unsigned len = str.size() * 4;
	setlocale(LC_CTYPE, "");
	char *p = new char[len];
	wcstombs(p, str.c_str(), len);
	std::string str1(p);
	delete[] p;
	return str1;
}

#include <codecvt>
bool CParseObjectFactory::ParseEnt()
{


	switch (m_pObj->type)
	{
	case DWG_TYPE_LAYER:
	{	
		parseLayer2Json();
		break;
	}
	case DWG_TYPE_LINE:
	{
		return parseLine2Json();
		break;
	}
	case DWG_TYPE_CIRCLE:
	{
		return parseCircle2Json();
		break;
	}
	case DWG_TYPE_LWPOLYLINE:
	{
		return parseLWPolylin2Json();
		break;
	}
	default:
		return false;
		break;
	}

	return false;
}

void CParseObjectFactory::GetJsonStr(std::string& strJson)
{
	strJson = m_json.toStyledString();
}

bool  CParseObjectFactory::parseLayer2Json()
{
	CLayer layer(m_pObj);

	m_json["type"] = "layer";

	m_json["name"] = layer.m_name;
	m_json["color"] = getColorJson(layer.m_color);

	return true;
}

bool CParseObjectFactory::parseLine2Json()
{
	CLine line(m_pObj->tio.entity);

	m_json["type"] = "line";
	m_json["layer"] = line.m_layerName;

	auto start = line.m_start;
	auto end = line.m_end;
	auto thickness = line.m_thickness;

	m_json["start"] = getPointJson(start);
	m_json["end"] = getPointJson(start);
	m_json["thickness"] = thickness;


	return true;
}

bool CParseObjectFactory::parseCircle2Json()
{
	return false;
}

bool CParseObjectFactory::parseLWPolylin2Json()
{
	return false;
}

Json::Value CParseObjectFactory::getPointJson(Dwg_Bitcode_3BD point)
{
	Json::Value jsonItem;
	jsonItem["x"] = point.x;
	jsonItem["y"] = point.y;
	jsonItem["z"] = point.z;

	return jsonItem;
}

Json::Value CParseObjectFactory::getColorJson(Utils::RGB rgb)
{
	Json::Value jsonItem;
	jsonItem["r"] = rgb.r;
	jsonItem["g"] = rgb.g;
	jsonItem["b"] = rgb.b;

	return jsonItem;
}