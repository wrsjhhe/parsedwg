#include "Layer.h"
#include "stringFunc.h"

CLayer::CLayer(const Dwg_Object* pObject) :
	CObjectBase(pObject)
{
	Dwg_Object_LAYER* layer = pObject->tio.object->tio.LAYER;
	m_name = Utils::GetCadChar(layer->name);

	short colorCode = Utils::GetCadColorCode(layer->color.rgb);

	Utils::GetRGBbyCadCode(layer->color.index,m_color);

}

CLayer::~CLayer()
{
	
}