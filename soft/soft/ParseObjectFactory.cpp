#include "ParseObjectFactory.h"
#include "Line.h"
#include "Circle.h"
#include "LWPolyline.h"
#include "Polyline_3d.h"
#include "Layer.h"
#include "stringFunc.h"
#include "BlockReference.h"
#include <iostream>

CParseObjectFactory::CParseObjectFactory()
{

}


CParseObjectFactory::~CParseObjectFactory()
{

}


std::string WstringToString(const std::wstring str)
{
	size_t len = str.size() * 4;
	setlocale(LC_CTYPE, "");
	char *p = new char[len];
	wcstombs(p, str.c_str(), len);
	std::string str1(p);
	delete[] p;
	return str1;
}


bool CParseObjectFactory::ParseEnt(Dwg_Object* pObj, Json::Value& jsonItem)
{
	return parseEnt(pObj, jsonItem);
}

bool CParseObjectFactory::parseEnt(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock)
{
	switch (pObj->type)
	{
	case DWG_TYPE_LAYER:  //层
	{
		return parseLayer2Json(pObj, jsonItem);
	}
	case DWG_TYPE_LINE: //线
	{
		return parseLine2Json(pObj, jsonItem, pBlock);
	}
	case DWG_TYPE_CIRCLE: //圆
	{
		return parseCircle2Json(pObj, jsonItem, pBlock);
	}
	case DWG_TYPE_LWPOLYLINE: //多段线
	{
		return parseLWPolylin2Json(pObj, jsonItem, pBlock);
	}
	case DWG_TYPE_POLYLINE_3D: //三维多段线
	{
		return parsePolylin3d2Json(pObj, jsonItem, pBlock);
	}
	case DWG_TYPE_HATCH: //填充
	{
		auto hatch = pObj->tio.entity->tio.HATCH;
		std::string str = Utils::GetCadChar(hatch->name);
		
		break;
	}
	case DWG_TYPE_INSERT: //块
	{
		return parseBlock2Json(pObj, jsonItem, pBlock);
	}
	default:
		return false;
		break;
	}

	return false;
}


bool  CParseObjectFactory::parseLayer2Json(Dwg_Object* pObj, Json::Value& jsonItem)
{
	CLayer layer(pObj);

	jsonItem["type"] = "Layer";

	jsonItem["name"] = layer.m_name;
	jsonItem["color"] = getColorJson(layer.m_color);

	return true;
}

bool CParseObjectFactory::parseEntity2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock)
{
	if (pObj->tio.entity->ownerhandle != nullptr && pBlock == nullptr)
		return false;

	CEntityBase ent(pObj->tio.entity);
	Utils::RGBA& color = ent.m_color;
	if (pBlock)
	{
		if (color.r == -1)
		{
			color = pBlock->m_color;
			color.a = ent.m_color.a;
		}

		if (color.a == -1)
		{
			color.a = pBlock->m_color.a;
		}
	}

	jsonItem["layer"] = ent.m_layerName;
	jsonItem["color"] = getColorJson(color);

	return true;
}

bool CParseObjectFactory::parseLine2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock)
{
	if (!parseEntity2Json(pObj, jsonItem, pBlock))
		return false;

	CLine line(pObj->tio.entity);


	jsonItem["type"] = "Line";
	jsonItem["start"] = getPointJson(line.m_start);
	jsonItem["end"] = getPointJson(line.m_end);
	jsonItem["thickness"] = line.m_thickness;

	return true;
}


bool CParseObjectFactory::parseCircle2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock)
{
	if (!parseEntity2Json(pObj, jsonItem, pBlock))
		return false;

	CCircle circle(pObj->tio.entity);

	jsonItem["type"] = "Circle";
	jsonItem["insert"] = getPointJson(circle.m_center);
	jsonItem["radius"] = circle.m_radius;
	jsonItem["thickness"] = circle.m_thickness;

	return true;
}

bool CParseObjectFactory::parseLWPolylin2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock)
{
	if (!parseEntity2Json(pObj, jsonItem, pBlock))
		return false;

	CLWPolyline poly(pObj->tio.entity);

	Json::Value jsonPts;
	for (size_t i = 0; i < poly.m_points.size(); i++)
	{
		jsonPts.append(getPointJson(poly.m_points.at(i)));
	}

	Json::Value jsonBulges;
	for (size_t i = 0; i < poly.m_bulges.size(); i++)
	{
		jsonBulges.append(poly.m_bulges.at(i));
	}

	jsonItem["type"] = "LWPolyline";
	jsonItem["points"] = jsonPts;
	jsonItem["bulges"] = jsonBulges;
	jsonItem["thickness"] = poly.m_thickness;

	return true;
}

bool CParseObjectFactory::parsePolylin3d2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock)
{
	if (!parseEntity2Json(pObj, jsonItem, pBlock))
		return false;

	CPolyline3d poly3(pObj->tio.entity);

	Json::Value jsonPts;
	for (size_t i = 0; i < poly3.m_points.size(); ++i)
	{
		jsonPts.append(getPointJson(poly3.m_points.at(i)));
	}

	jsonItem["type"] = "Polyline3D";
	jsonItem["points"] = jsonPts;

	return true;
}

bool CParseObjectFactory::parseBlock2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock)
{
	if (!parseEntity2Json(pObj, jsonItem, pBlock))
		return false;

	CBlockReference blockRef(pObj->tio.entity);

	auto blockHeader = blockRef.m_blockHeader->obj->tio.object->tio.BLOCK_HEADER;
	int num = blockHeader->num_owned;

	Json::Value jsonEntities;
	for (size_t i = 0; i < num; i++)
	{
		auto pEnt = blockHeader->entities[i];
		Json::Value subJsonItem;
		if (parseEnt(pEnt->obj, subJsonItem, &blockRef))
			jsonEntities.append(subJsonItem);
	}

	jsonItem["type"] = "BlockReference";
	jsonItem["insert"] = getPointJson(blockRef.m_insert);
	jsonItem["entities"] = jsonEntities;
	return true;
}


Json::Value CParseObjectFactory::getPointJson(const BITCODE_2RD& point)
{
	Json::Value jsonItem;
	jsonItem["x"] = point.x;
	jsonItem["y"] = point.y;

	return jsonItem;
}

Json::Value CParseObjectFactory::getPointJson(const BITCODE_3BD& point)
{
	Json::Value jsonItem;
	jsonItem["x"] = point.x;
	jsonItem["y"] = point.y;
	jsonItem["z"] = point.z;

	return jsonItem;
}

Json::Value CParseObjectFactory::getColorJson(const Utils::RGBA& rgb)
{
	Json::Value jsonItem;
	jsonItem["r"] = rgb.r;
	jsonItem["g"] = rgb.g;
	jsonItem["b"] = rgb.b;
	jsonItem["a"] = rgb.a;

	return jsonItem;
}